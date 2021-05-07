import { ILike, In } from 'typeorm'
import { Resolver, Query, Mutation, Arg, Args } from 'type-graphql'
import { Department, Resource } from '../models'
import { CreateResourceInput, UpdateResourceInput } from '../inputs'
import { GetResourcesWithFilter } from '../filters'
// import { LessThan, Like, MoreThan, getRepository } from 'typeorm'
@Resolver()
export class ResourceResolver {
  @Query(() => [Resource])
  async resources(@Args() filter: GetResourcesWithFilter) {
    const where: { [key: string]: any } = {}

    if (filter?.clients) {
      where.clients = In(filter.clients)
    }

    if (filter?.title) {
      where.title = In(filter.title)
    }

    if (filter?.departmentName) {
      where.departmentName = In(filter.departmentName)
    }

    if (filter?.project) {
      where.project = In(filter.project)
    }

    if (filter?.project) {
      where.project = In(filter.project)
    }

    if (filter?.skills) {
      where.skills = In(filter.skills)
    }

    console.log('WHERE: ', where)

    const foundResource = await Resource.find({
      where: where,
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
