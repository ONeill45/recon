import { Factory } from 'rosie'
import faker from 'faker'
import { ResourceAllocation } from '../../src/models'
import { AuditableEntityFactory } from './AuditableEntity'

export const ResourceAllocationFactory = Factory.define<ResourceAllocation>(
  'ResourceAllocation',
)
  .option('isCurrent', true)
  .extend(AuditableEntityFactory)
  .attr('id', () => faker.random.uuid())
  .attr('resource', () => null)
  .attr('project', () => null)
  .attr('startDate', () => new Date(faker.date.past()).toISOString())
  .attr('endDate', ['isCurrent'], (isCurrent) =>
    isCurrent ? null : new Date(faker.date.recent().toISOString()),
  )
  .attr('endReason', ['isCurrent'], (isCurrent) =>
    isCurrent ? null : faker.random.words(),
  )
  .attr('percentage', () => faker.random.number(100))
