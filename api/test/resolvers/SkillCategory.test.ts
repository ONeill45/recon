import { Connection } from 'typeorm'

import '../utils/populateEnvVariables'
import { connect } from '../../src/database'
import { SkillCategory } from '../../src/models'
import { gqlCall } from '../utils/gqlCall'
import { uuidRegex } from '../utils/regex'
import { SkillCategoryFactory } from '../factories/SkillCategory'

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

describe('SkillCategoryResolver', () => {
  describe('skillCategories()', () => {
    const query = `{
      skillCategories {
        id
        skillCategoryName
      }
    }`

    it('should return an empty array if no skills exist', async () => {
      const response = await gqlCall({
        source: query,
      })

      expect(response).toEqual({
        data: {
          skillCategories: [],
        },
      })
    })

    it('should return a populated array if skillCategories exist', async () => {
      await SkillCategory.insert(SkillCategoryFactory.build())

      const response = await gqlCall({
        source: query,
      })

      expect(response.data.skillCategories.length).toBeGreaterThan(0)
    })
  })

  describe('createSkillCategory()', () => {
    const createSkillCategoryMutation = `
    mutation createSkillCategory($data: SkillCategoryInput!) {
      createSkillCategory (data: $data) {
        id
      }
    }`

    it('should create a skill category and return it', async () => {
      const skillCategory = SkillCategoryFactory.build()

      await SkillCategory.insert(skillCategory)

      const response = await gqlCall({
        source: createSkillCategoryMutation,
        variableValues: {
          data: {
            skillCategoryName: skillCategory.skillCategoryName,
          },
        },
      })

      expect(response).toMatchObject({
        data: {
          createSkillCategory: {
            id: expect.stringMatching(uuidRegex),
          },
        },
      })
    })
  })
})
