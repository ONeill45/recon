import { Resolver, Query, Mutation, Arg } from 'type-graphql'
import { Department, Resource } from '../models'
import { CreateResourceInput, UpdateResourceInput } from '../inputs'
@Resolver()
export class ResourceResolver {
  @Query(() => [Resource])
  async resources() {
    return Resource.find()
  }

  @Query(() => Resource, { nullable: true })
  async resource(@Arg('id') id: string): Promise<Resource | null> {
    return Resource.findOne(id)
  }

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
