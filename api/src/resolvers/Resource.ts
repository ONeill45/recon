import { ILike, In, LessThan, MoreThan, Equal } from 'typeorm'
import { Resolver, Query, Mutation, Arg, Args } from 'type-graphql'
import {
  Department,
  Resource,
  Project,
  ResourceAllocation,
  Client,
} from '../models'
import { CreateResourceInput, UpdateResourceInput } from '../inputs'
import { GetResourcesWithFilter } from '../filters'
import { format } from 'date-fns'

@Resolver()
export class ResourceResolver {
  @Query(() => [Resource])
  async resources(
    @Args() filter: GetResourcesWithFilter,
  ): Promise<Resource[] | null> {
    const where: { [key: string]: any } = {}
    let resourceIds: any = []
    let textSearchWhere: Array<{ [key: string]: any }> = [
      {
        firstName: ILike(`${filter.searchItem}%`),
      },
      {
        lastName: ILike(`${filter.searchItem}%`),
      },
      {
        preferredName: ILike(`${filter.searchItem}%`),
      },
      {
        email: ILike(`${filter.searchItem}%`),
      },
    ]

    if (filter?.title) {
      where.title = In(filter.title)
    }

    if (filter?.departmentName) {
      const foundDepartment = await Department.find({
        where: {
          name: In(filter.departmentName),
        },
      })
      const departmentIds = foundDepartment.map((dep: any) => {
        return dep.id
      })
      where.department_id = In(departmentIds)
    }

    if (filter?.project) {
      const foundProject = await Project.find({
        relations: ['resourceAllocations'],
        where: {
          projectName: In(filter.project),
        },
      })
      const projectIds = foundProject.map((proj: any) => {
        return proj.id
      })
      const foundResourceAllocations = await ResourceAllocation.find({
        where: {
          project: {
            id: In(projectIds),
          },
        },
      })
      const currentDate = new Date()
      const currentAllocations = foundResourceAllocations.filter(
        (ra) => !ra.endDate || new Date(ra.endDate) > currentDate,
      )
      const currentResourceIds = currentAllocations.map(
        (ra: any) => ra.resource.id,
      )
      resourceIds = currentResourceIds
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
        where.terminationDate = LessThan(
          format(new Date(filter.endDate.date), 'yyyy-MM-dd'),
        )
      } else if (filter.endDate.beforeAfter === 'after') {
        where.terminationDate = MoreThan(
          format(new Date(filter.endDate.date), 'yyyy-MM-dd'),
        )
      } else {
        where.terminationDate = Equal(
          format(new Date(filter.endDate.date), 'yyyy-MM-dd'),
        )
      }
    }

    if (filter?.clients) {
      const foundClients = await Client.find({
        where: {
          clientName: In(filter.clients),
        },
      })
      const clientIds = foundClients.map((client: any) => client.id)
      const foundProjects = await Project.find({
        relations: ['resourceAllocations'],
        where: {
          client: In(clientIds),
        },
      })
      const projectIds = foundProjects.map((proj: any) => proj.id)
      const foundResourceAllocations = await ResourceAllocation.find({
        where: {
          project: {
            id: In(projectIds),
          },
        },
      })
      const currentDate = new Date()
      const currentAllocations = foundResourceAllocations.filter(
        (ra) => !ra.endDate || new Date(ra.endDate) > currentDate,
      )

      const currentResourceIds = currentAllocations.map(
        (ra: any) => ra.resource.id,
      )
      resourceIds = resourceIds.concat(currentResourceIds)
    }

    if (resourceIds.length > 0) {
      where.id = In(resourceIds)
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
    const foundResource = await Resource.find({
      where: textSearchWhere,
      relations: ['resourceAllocations'],
    })

    return foundResource
  }

  @Query(() => Resource, { nullable: true })
  async resource(@Arg('id') id: string): Promise<Resource | null> {
    return Resource.findOne(id, { relations: ['resourceAllocations'] })
  }

  // @Query(() => [Resource])
  // async resources(
  //   @Arg('searchItem', { nullable: true }) searchItem: string,
  // ): Promise<Resource[] | null> {
  //   const foundResource = await Resource.find({
  //     relations: ['resourceAllocations'],
  //     where: [
  //       {
  //         firstName: ILike(`${searchItem}%`),
  //       },
  //       {
  //         lastName: ILike(`${searchItem}%`),
  //       },
  //       {
  //         preferredName: ILike(`${searchItem}%`),
  //       },
  //       {
  //         email: ILike(`${searchItem}%`),
  //       },
  //     ],
  //   })
  //   return foundResource
  // }

  @Mutation(() => Resource)
  async createResource(@Arg('data') data: CreateResourceInput) {
    const { departmentId } = data
    const department = await Department.findOne(departmentId)
    if (!department) throw new Error(`Department ${departmentId} not found!`)

    const resource = Resource.create({ department, ...data })
    await resource.save()
    return resource
  }

  @Mutation(() => Resource)
  async updateResource(
    @Arg('id') id: string,
    @Arg('data') data: UpdateResourceInput,
  ) {
    const resource = await Resource.findOne(id)
    if (!resource) throw new Error(`Resource ${id} not found!`)
    const { departmentId } = data
    const department = await Department.findOne(departmentId)
    if (!department) throw new Error(`Department ${departmentId} not found!`)

    Object.assign(resource, { department, ...data })
    await resource.save()
    return resource
  }

  @Mutation(() => Boolean)
  async deleteResource(@Arg('id') id: string) {
    const resource = await Resource.findOne(id)
    if (!resource) throw new Error(`Resource ${id} not found!`)
    await resource.softRemove()
    return true
  }
}
