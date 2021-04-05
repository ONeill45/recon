import { Factory } from 'rosie'
import faker from 'faker'
import { SkillCategory } from '../../src/models'
import { AuditableEntityFactory } from './AuditableEntity'
import { SkillCategoryName } from '../../src/models/enums'

export const SkillCategoryFactory = Factory.define<SkillCategory>(
  'SkillCategory',
)
  .extend(AuditableEntityFactory)
  .attr('id', () => faker.random.uuid())
  .attr('skillCategoryName', () =>
    faker.random.objectElement<SkillCategoryName>(SkillCategoryName),
  )
