import { Resolver, Query, Arg } from 'type-graphql'
import { Department } from '../models'

@Resolver()
export class DepartmentResolver {
  @Query(() => [Department])
  departments() {
    return Department.find()
  }

  @Query(() => Department)
  department(@Arg('id') id: string) {
    return Department.findOne({ id })
  }
}
