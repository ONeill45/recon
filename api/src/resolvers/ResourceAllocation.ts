import { Resolver, Query, Arg } from 'type-graphql'
import { ResourceAllocation } from '../models'

@Resolver()
export class ResourceAllocationResolver {
  @Query(() => [ResourceAllocation])
  async resourceAllocation() {
    return ResourceAllocation.find()
  }
  @Query(() => [ResourceAllocation])
  async resourceAllocationByResourceId(@Arg('resourceId') resourceId: string) {
    return ResourceAllocation.find({ where: { resource: { id: resourceId } } })
  }
}
