import { Arg, Query, Mutation, Resolver } from 'type-graphql'
import { Project } from '../models'
import { CreateProjectInput, UpdateProjectInput } from '../inputs/Project'

@Resolver()
export class ProjectResolver {
  @Query(() => [Project])
  async projects() {
    return Project.find()
  }

  @Query(() => Project, { nullable: true })
  async project(@Arg('id') id: string): Promise<Project | null> {
    return Project.findOne(id, { relations: ['resourceAllocations'] })
  }

  @Mutation(() => Project)
  async createProject(@Arg('data') data: CreateProjectInput) {
    const project = Project.create(data)
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
    Object.assign(project, data)
    await project.save()
    return project
  }
}
