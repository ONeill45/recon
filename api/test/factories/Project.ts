import { Factory } from 'rosie'
import faker from 'faker'
import { Project, Resource } from '../../src/models'
import { AuditableEntityFactory } from './AuditableEntity'
import { ClientFactory, ResourceAllocationFactory } from './'
import { ProjectType } from '../../src/models/enums'

interface ResourceAllocationsInput {
  resource: Resource
  isCurrent: boolean
}

export const ProjectFactory = (allocations: ResourceAllocationsInput[] = []) =>
  Factory.define<Project>('Project')
    .extend(AuditableEntityFactory)
    .attr('id', () => faker.random.uuid())
    .attr('projectName', () => faker.company.companyName())
    .attr('startDate', () => new Date(faker.date.past()).toISOString())
    .attr('endDate', null)
    .attr('priority', () => faker.random.number({ min: 1, max: 4 }))
    .attr('confidence', () => faker.random.number({ min: 1, max: 4 }))
    .attr('client', () => ClientFactory.build())
    .attr('projectType', () =>
      faker.random.objectElement<ProjectType>(ProjectType),
    )
    .attr('resourceAllocations', () => {
      if (allocations.length) {
        return allocations.map((allocation) => {
          const { resource, isCurrent } = allocation
          return ResourceAllocationFactory.build({ resource }, { isCurrent })
        })
      } else return []
    })
