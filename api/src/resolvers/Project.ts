import { Query, Resolver } from 'type-graphql'
import { Project } from '../models'

@Resolver()
export class ProjectResolver {
  @Query(() => [Project])
  projects() {
    return Project.find()
  }
}
