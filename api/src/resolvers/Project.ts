import { Arg, Query, Resolver } from 'type-graphql'
import { Project } from '../models'

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
}
