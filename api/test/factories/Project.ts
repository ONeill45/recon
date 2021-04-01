import { Factory } from 'rosie'
import faker from 'faker'
import { Project, Resource } from '../../src/models'
import { AuditableEntityFactory } from './AuditableEntity'
import { ClientFactory } from './'
import { Priority, ProjectType } from '../../src/models/enums'
import { ResourceAllocationFactory } from './ResourceAllocation'

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
    .attr('priority', () => faker.random.objectElement<Priority>(Priority))
    .attr('confidence', () => faker.random.number({ min: 1, max: 100 }))
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
