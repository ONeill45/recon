import { Resolver, Query, Mutation, Arg } from 'type-graphql'
import { Resource } from '../models'
import { CreateResourceInput, UpdateResourceInput } from '../inputs'
@Resolver()
export class ResourceResolver {
  @Query(() => [Resource])
  async resources() {
    return Resource.find()
  }

  @Query(() => Resource, { nullable: true })
  async resource(@Arg('id') id: string): Promise<Resource | null> {
    return Resource.findOne({ where: { id } })
  }

  @Mutation(() => Resource)
  async createResource(@Arg('data') data: CreateResourceInput) {
    const resource = Resource.create(data)
    await resource.save()
    return resource
  }

  @Mutation(() => Resource)
  async updateResource(
    @Arg('id') id: string,
    @Arg('data') data: UpdateResourceInput,
  ) {
    const resource = await Resource.findOne({ where: { id } })
    if (!resource) throw new Error(`Resource ${id} not found!`)
    Object.assign(resource, data)
    await resource.save()
    return resource
  }

  @Mutation(() => Boolean)
  async deleteResource(@Arg('id') id: string) {
    const resource = await Resource.findOne({ where: { id } })
    if (!resource) throw new Error(`Resource ${id} not found!`)
    await resource.softRemove()
    return true
  }
}
