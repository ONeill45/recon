import { Factory } from 'rosie'
import faker from 'faker'
import { Skill } from '../../src/models'
import { AuditableEntityFactory } from './AuditableEntity'
import { SkillCategoryFactory } from './SkillCategory'

export const SkillFactory = Factory.define<Skill>('Skill')
  .extend(AuditableEntityFactory)
  .attr('id', () => faker.random.uuid())
  .attr('skillName', () => faker.company.companyName())
  .attr('skillCategory', () => SkillCategoryFactory.build())
