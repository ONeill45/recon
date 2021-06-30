import {
  Arg,
  Query,
  Mutation,
  Resolver,
  Args,
  ObjectType,
  Field,
} from 'type-graphql'
import { Client, Project } from '../models'
import { GetProjectsWithFilter } from '../filters'
import { CreateProjectInput, UpdateProjectInput } from '../inputs/Project'
import { LessThan, MoreThan, Equal, In, ILike } from 'typeorm'
import { format } from 'date-fns'

@ObjectType()
export class ProjectQuery {
  @Field(() => [Project])
  projects: Project[]

  @Field(() => Number)
  count: Number
}

@Resolver()
export class ProjectResolver {
  @Query(() => Project, { nullable: true })
  async project(@Arg('id') id: string): Promise<Project | null> {
    return Project.findOne(id, { relations: ['resourceAllocations'] })
  }

  @Query(() => ProjectQuery)
  async projects(
    @Args() filter: GetProjectsWithFilter,
  ): Promise<ProjectQuery | null> {
    const skip =
      (filter?.pagination?.page - 1) * filter?.pagination?.itemsPerPage || 0
    const take = filter?.pagination?.itemsPerPage || 1000
    const where: { [key: string]: any } = {}
    let textSearchWhere: Array<{ [key: string]: any }> = [
      {
        projectName: ILike(`${filter.searchItem}%`),
      },
    ]

    if (filter?.projectTypes) {
      where.projectType = In(filter.projectTypes)
    }

    if (filter?.priorities) {
      where.priority = In(filter.priorities)
    }

    if (filter?.startDate) {
      if (filter.startDate.beforeAfter === 'before') {
        where.startDate = LessThan(
          format(new Date(filter.startDate.date), 'yyyy-MM-dd'),
        )
      } else if (filter.startDate.beforeAfter === 'after') {
        where.startDate = MoreThan(
          format(new Date(filter.startDate.date), 'yyyy-MM-dd'),
        )
      } else {
        where.startDate = Equal(
          format(new Date(filter.startDate.date), 'yyyy-MM-dd'),
        )
      }
    }

    if (filter?.endDate) {
      if (filter.endDate.beforeAfter === 'before') {
        where.endDate = LessThan(
          format(new Date(filter.endDate.date), 'yyyy-MM-dd'),
        )
      } else if (filter.endDate.beforeAfter === 'after') {
        where.endDate = MoreThan(
          format(new Date(filter.endDate.date), 'yyyy-MM-dd'),
        )
      } else {
        where.endDate = Equal(
          format(new Date(filter.endDate.date), 'yyyy-MM-dd'),
        )
      }
    }

    if (filter?.clientNames) {
      const foundClient = await Client.find({
        where: {
          clientName: In(filter.clientNames),
        },
      })

      const clientIds = foundClient.map((client: any) => {
        return client.id
      })

      where.client = In(clientIds)
    }

    if (filter?.confidence) {
      where.confidence = filter.confidence
    }

    let updatedWhere = []
    if (Object.keys(where).length > 0) {
      updatedWhere = textSearchWhere.map((field: any) => {
        Object.entries(where).map((item: any) => {
          field[item[0]] = item[1]
        })
        return field
      })
      textSearchWhere = textSearchWhere.concat(updatedWhere)
    }

    const query: any = {
      order: {
        projectName: 'ASC',
      },
      skip: skip,
      take: take,
      relations: ['resourceAllocations'],
    }

    if (Object.keys(filter).length !== 0) {
      query.where = textSearchWhere
    }

    const [projects, count] = await Project.findAndCount(query)

    return {
      projects,
      count,
    }
  }

  @Mutation(() => Project)
  async createProject(@Arg('data') data: CreateProjectInput) {
    const { clientId } = data
    const client = await Client.findOne(clientId)
    if (!client) throw new Error(`Client ${clientId} not found!`)

    const project = Project.create({ client, ...data })
    await project.save()
    return project
  }

  @Mutation(() => Project)
  async updateProject(
    @Arg('id') id: string,
    @Arg('data') data: UpdateProjectInput,
  ) {
    const project = await Project.findOne({ id })
    if (!project) throw new Error(`Project ${id} not found!`)

    const { clientId } = data
    const client = await Client.findOne(clientId)
    if (!client) throw new Error(`Client ${clientId} not found!`)

    Object.assign(project, { client, ...data })
    await project.save()
    return project
  }
}
