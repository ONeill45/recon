import { Connection } from 'typeorm'

import '../utils/populateEnvVariables'
import { connect } from '../../src/database'
import { Skill, SkillCategory } from '../../src/models'
import { ResourceSkillFactory, SkillFactory } from '../factories'
import { gqlCall } from '../utils/gqlCall'
import { uuidRegex } from '../utils/regex'
import { SkillCategoryFactory } from '../factories/SkillCategory'
import { ResourceSkill } from '../../src/models/ResourceSkill'
import { ResourceFactory } from '../factories/Resource'
import { Resource } from '../../src/models/Resource'
import { DepartmentFactory } from '../factories/Department'
import { Department } from '../../src/models/Department'

let connection: Connection
beforeAll(async () => {
  connection = (await connect()).connection
})

afterAll(async () => {
  await connection.close()
})

beforeEach(async () => {
  await connection.synchronize(true)
})

describe('resouceSkillResolver', () => {
  describe('resourceSkills()', () => {
    const query = `{
      resourceSkills {
        id
        resource {
          id
        }
        skill {
          id
        }
        skillValue
      }
    }`

    it('should return an empty array if no resourceSkills exist', async () => {
      const response = await gqlCall({
        source: query,
      })

      expect(response).toEqual({
        data: {
          resourceSkills: [],
        },
      })
    })

    it('should return a populated array if resourceSkills exist', async () => {
      const department = DepartmentFactory.build()
      await Department.insert(department)

      const resource = ResourceFactory.build()
      resource.department = department.id
      await Resource.insert(resource)

      const skillCategory = SkillCategoryFactory.build()
      await SkillCategory.insert(skillCategory)

      const skill = SkillFactory.build()
      skill.skillCategory = skillCategory.id
      await Skill.insert(skill)

      const resourceSkill = ResourceSkillFactory.build()
      resourceSkill.resource = resource.id
      resourceSkill.skill = skill.id
      await ResourceSkill.insert(resourceSkill)

      const response = await gqlCall({
        source: query,
      })

      expect(response.data.resourceSkills.length).toBeGreaterThan(0)
    })
  })

  describe('createResourceSkill()', () => {
    const createResourceSkillMutation = `
    mutation createResourceSkill($data: ResourceSkillInput!) {
      createResourceSkill (data: $data) {
        id
      }
    }`

    it('should create a resource skill and return it', async () => {
      const department = DepartmentFactory.build()
      await Department.insert(department)

      const resource = ResourceFactory.build()
      resource.department = department.id
      await Resource.insert(resource)

      const skillCategory = SkillCategoryFactory.build()
      await SkillCategory.insert(skillCategory)

      const skill = SkillFactory.build()
      skill.skillCategory = skillCategory.id
      await Skill.insert(skill)

      const response = await gqlCall({
        source: createResourceSkillMutation,
        variableValues: {
          data: {
            resource: resource.id,
            skill: skill.id,
            skillValue: 50,
          },
        },
      })

      expect(response).toMatchObject({
        data: {
          createResourceSkill: {
            id: expect.stringMatching(uuidRegex),
          },
        },
      })
    })
  })
})
