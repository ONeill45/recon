import { Connection } from 'typeorm'

import '../utils/populateEnvVariables'
import { connect } from '../../src/database'
import { Skill, SkillCategory } from '../../src/models'
import { SkillFactory } from '../factories'
import { gqlCall } from '../utils/gqlCall'
import { uuidRegex } from '../utils/regex'

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

describe('SkillResolver', () => {
  describe('skills()', () => {
    const query = `{
      skills {
        id
        skillName
        skillCategory {
          id
        }
      }
    }`

    it('should return an empty array if no skills exist', async () => {
      const response = await gqlCall({
        source: query,
      })

      expect(response).toEqual({
        data: {
          skills: [],
        },
      })
    })

    it('should return a populated array if skills exist', async () => {
      const skill = SkillFactory.build()
      const { skillCategory } = skill

      await SkillCategory.insert(skillCategory)
      await Skill.insert(skill)
      const response = await gqlCall({
        source: query,
      })

      expect(response.data.skills.length).toBeGreaterThan(0)
    })
  })

  describe('createSkill()', () => {
    const createSkillMutation = `
    mutation createSkill($data: SkillInput!) {
      createSkill (data: $data) {
        id
      }
    }`

    it('should create a skill and return it', async () => {
      const skill = SkillFactory.build()
      const { skillName, skillCategory } = skill

      await SkillCategory.insert(skillCategory)

      const response = await gqlCall({
        source: createSkillMutation,
        variableValues: {
          data: {
            skillName,
            skillCategoryId: skillCategory.id,
          },
        },
      })

      expect(response).toMatchObject({
        data: {
          createSkill: {
            id: expect.stringMatching(uuidRegex),
          },
        },
      })
    })
  })
})
