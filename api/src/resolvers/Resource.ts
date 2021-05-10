import { ILike, In, LessThan, MoreThan, Equal } from 'typeorm'
import { Resolver, Query, Mutation, Arg, Args } from 'type-graphql'
import { Department, Resource, Project, ResourceAllocation } from '../models'
import { CreateResourceInput, UpdateResourceInput } from '../inputs'
import { GetResourcesWithFilter } from '../filters'
import { format } from 'date-fns'

@Resolver()
export class ResourceResolver {
  @Query(() => [Resource])
  async resources(@Args() filter: GetResourcesWithFilter) {
    const where: { [key: string]: any } = {}

    // if (filter?.clients) {
    //   where.clients = In(filter.clients)
    // }

    if (filter?.title) {
      where.title = In(filter.title)
    }

    if (filter?.departmentName) {
      const foundDepartment = await Department.find({
        where: {
          name: In(filter.departmentName),
        },
      })

      console.log('FOUND DEPARTMENT: ', foundDepartment)

      const departmentIds = foundDepartment.map((dep: any) => {
        return dep.id
      })

      where.department_id = In(departmentIds)
    }

    if (filter?.project) {
      console.log('proj name: ', filter.project)
      const foundProject = await Project.find({
        relations: ['resourceAllocations'],
        where: {
          projectName: In(filter.project),
        },
      })

      const projectIds = foundProject.map((proj: any) => {
        return proj.id
      })

      // console.log('PROJECT IDS: ', projectIds)

      const foundResourceAllocations = await ResourceAllocation.find({
        where: {
          project: {
            id: In(projectIds),
          },
        },
      })

      // console.log('FOUND RESOURCE ALLOCATIONS: ', foundResourceAllocations)

      const currentDate = new Date()
      const currentAllocations = foundResourceAllocations.filter(
        (ra) => !ra.endDate || new Date(ra.endDate) > currentDate,
      )

      const currentResourceIds = currentAllocations.map((ra: any) => {
        return ra.resource.id
      })

      where.id = In(currentResourceIds)

      // console.log('foundResourceAllocation: ', foundResourceAllocation)
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

    if (filter?.skills) {
      where.skills = In(filter.skills)
    }

    console.log('WHERE: ', where)

    const foundResource = await Resource.find({
      where: where,
      relations: ['resourceAllocations'],
    })

    // console.log('FOUND RESOURCEEEE: ', foundResource)

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
