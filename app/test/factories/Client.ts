import { Factory } from 'rosie'
import faker from 'faker'
import { Client } from '../../src/models'
import { AuditableEntityFactory } from './AuditableEntity'

export const ClientFactory = Factory.define<Client>('Client')
  .extend(AuditableEntityFactory)
  .attr('id', () => faker.random.uuid())
  .attr('clientName', () => faker.company.companyName())
  .attr('description', () => faker.lorem.sentence())
  .attr('logoUrl', () => faker.image.business())
  .attr('startDate', () => new Date(faker.date.past()).toISOString())
  .attr('endDate', null)
