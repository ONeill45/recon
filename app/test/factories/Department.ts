import { Factory } from 'rosie'
import faker from 'faker'
import { DepartmentNames, Department } from '../../src/interfaces'
import { AuditableEntityFactory } from './AuditableEntity'

export const DepartmentFactory = () =>
  Factory.define<Department>('Department')
    .extend(AuditableEntityFactory)
    .attr('id', () => faker.random.uuid())
    .attr('name', () =>
      faker.random.objectElement<DepartmentNames>(DepartmentNames),
    )
