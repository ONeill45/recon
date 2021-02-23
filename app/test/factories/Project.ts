import { Factory } from 'rosie'
import faker from 'faker'
import { Project } from 'interfaces'
import { AuditableEntityFactory } from './AuditableEntity'
import { ClientFactory } from './'
import { ProjectType } from 'interfaces/Enum'

export const ProjectFactory = Factory.define<Project>('Project')
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
