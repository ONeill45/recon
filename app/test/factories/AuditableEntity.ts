import { Factory } from 'rosie'
import faker from 'faker'

export const AuditableEntityFactory = Factory.define('AuditableEntity')
  .attr('createdDate', () => faker.date.past())
  .attr('createdBy', () => faker.datatype.uuid())
  .attr('updatedDate', () => faker.date.recent())
  .attr('updatedBy', () => faker.datatype.uuid())
  .attr('deletedDate', null)
  .attr('deletedBy', null)
