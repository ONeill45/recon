import { Factory } from 'rosie'
import faker from 'faker'
import { Resource, Project } from 'interfaces'
import { DepartmentFactory, ResourceAllocationFactory } from './'
import { AuditableEntityFactory } from './AuditableEntity'

interface ProjectAllocationsInput {
  project: Project
  isCurrent: boolean
}

export const ResourceFactory = (allocations: ProjectAllocationsInput[] = []) =>
  Factory.define<Resource>('Resource')
    .extend(AuditableEntityFactory)
    .attr('id', () => faker.datatype.uuid())
    .attr('firstName', () => faker.name.firstName())
    .attr('lastName', () => faker.name.lastName())
    .attr('preferredName', null)
    .attr('title', () => faker.name.jobTitle())
    .attr('imageUrl', () => faker.image.people())
    .attr('department', () => DepartmentFactory().build())
    .attr('email', () => faker.internet.email())
    .attr('startDate', () => new Date(faker.date.past()).toISOString())
    .attr('terminationDate', null)
    .attr('resourceAllocations', () => {
      if (allocations.length) {
        return allocations.map((allocation) => {
          const { project, isCurrent } = allocation
          return ResourceAllocationFactory().build({ project }, { isCurrent })
        })
      } else return []
    })
