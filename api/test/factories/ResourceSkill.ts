import { Factory } from 'rosie'
import faker from 'faker'
import { ResourceSkill } from '../../src/models'
import { AuditableEntityFactory } from './AuditableEntity'
import { ResourceFactory } from './Resource'
import { SkillFactory } from './Skill'

export const ResourceSkillFactory = Factory.define<ResourceSkill>(
  'ResourceSkill',
)
  .extend(AuditableEntityFactory)
  .attr('id', () => faker.random.uuid())
  .attr('resource', () => ResourceFactory().build())
  .attr('skill', () => SkillFactory.build())
  .attr('skillValue', () => faker.random.number())
