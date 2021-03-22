import { Factory } from 'rosie'
import faker from 'faker'
import { SkillCategory } from '../../src/models'
import { AuditableEntityFactory } from './AuditableEntity'

export const SkillCategoryFactory = Factory.define<SkillCategory>(
  'SkillCategory',
)
  .extend(AuditableEntityFactory)
  .attr('id', () => faker.random.uuid())
  .attr('skillCategoryName', () => 'Technical')
