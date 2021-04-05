import { Resolver, Query } from 'type-graphql'
import { Department } from '../models'

@Resolver()
export class DepartmentResolver {
  @Query(() => [Department])
  departments() {
    return Department.find()
  }
}
