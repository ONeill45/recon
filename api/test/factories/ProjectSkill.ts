import { Factory } from 'rosie'
import faker from 'faker'
import { ProjectSkill } from '../../src/models'
import { AuditableEntityFactory } from './AuditableEntity'
import { ProjectFactory } from '.'
import { SkillFactory } from './Skill'

export const ProjectSkillFactory = Factory.define<ProjectSkill>('ProjectSkill')
  .extend(AuditableEntityFactory)
  .attr('id', () => faker.random.uuid())
  .attr('project', () => ProjectFactory.build())
  .attr('skill', () => SkillFactory.build())
  .attr('skillValue', () => faker.random.number())
