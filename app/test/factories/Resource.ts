import { Factory } from 'rosie'
import faker from 'faker'
import { Resource } from '../../src/interfaces'
import { DepartmentFactory, ResourceAllocationFactory } from './'
import { AuditableEntityFactory } from './AuditableEntity'

export const ResourceFactory = Factory.define<Resource>('Resource')
  .extend(AuditableEntityFactory)
  .attr('id', () => faker.random.uuid())
  .attr('firstName', () => faker.name.firstName())
  .attr('lastName', () => faker.name.lastName())
  .attr('preferredName', null)
  .attr('title', () => faker.name.jobTitle())
  .attr('imageUrl', () => faker.image.people())
  .attr('department', () => DepartmentFactory.build())
  .attr('email', () => faker.internet.email())
  .attr('startDate', () => new Date(faker.date.past()).toISOString())
  .attr('terminationDate', null)
  .attr('resourceAllocations', () => [
    ResourceAllocationFactory.build({}, { isCurrent: true }),
    ResourceAllocationFactory.build({}, { isCurrent: false }),
  ])
