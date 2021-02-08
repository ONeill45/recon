import { Factory } from 'rosie'
import faker from 'faker'

export const AuditableEntityFactory = Factory.define('AuditableEntity')
  .attr('createdDate', () => faker.date.past())
  .attr('createdBy', () => faker.random.uuid())
  .attr('updatedDate', () => faker.date.recent())
  .attr('updatedBy', () => faker.random.uuid())
  .attr('deletedDate', null)
  .attr('deletedBy', null)
