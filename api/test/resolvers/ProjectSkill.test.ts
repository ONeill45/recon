import { Connection } from 'typeorm'

import '../utils/populateEnvVariables'
import { connect } from '../../src/database'
import {
  Client,
  Project,
  ProjectSkill,
  Skill,
  SkillCategory,
} from '../../src/models'
import { ProjectFactory, SkillFactory } from '../factories'
import { gqlCall } from '../utils/gqlCall'
import { uuidRegex } from '../utils/regex'
import { ProjectSkillFactory } from '../factories/ProjectSkill'
import { ClientFactory } from '../factories/Client'
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

describe('projectSkillResolver', () => {
  describe('projectSkills()', () => {
    const query = `{
      projectSkills {
        id
        project {
          id
        }
        skill {
          id
        }
        skillValue
      }
    }`

    it('should return an empty array if no projectSkills exist', async () => {
      const response = await gqlCall({
        source: query,
      })

      expect(response).toEqual({
        data: {
          projectSkills: [],
        },
      })
    })

    it('should return a populated array if projectSkills exist', async () => {
      const client = ClientFactory.build()
      await Client.insert(client)

      const project = ProjectFactory().build()
      project.client = client.id
      await Project.insert(project)

      const skillCategory = SkillCategoryFactory.build()
      await SkillCategory.insert(skillCategory)

      const skill = SkillFactory.build()
      skill.skillCategory = skillCategory.id
      await Skill.insert(skill)

      const projectSkill = ProjectSkillFactory.build()
      projectSkill.project = project.id
      projectSkill.skill = skill.id
      await ProjectSkill.insert(projectSkill)

      const response = await gqlCall({
        source: query,
      })

      expect(response.data.projectSkills.length).toBeGreaterThan(0)
    })
  })

  describe('createProjectSkill()', () => {
    const createProjectSkillMutation = `
    mutation createProjectSkill($data: ProjectSkillInput!) {
      createProjectSkill (data: $data) {
        id
      }
    }`

    it('should create a project skill and return it', async () => {
      const client = ClientFactory.build()
      await Client.insert(client)

      const project = ProjectFactory().build()
      project.client = client.id
      await Project.insert(project)

      const skillCategory = SkillCategoryFactory.build()
      await SkillCategory.insert(skillCategory)

      const skill = SkillFactory.build()
      skill.skillCategory = skillCategory.id
      await Skill.insert(skill)

      const response = await gqlCall({
        source: createProjectSkillMutation,
        variableValues: {
          data: {
            projectId: project.id,
            skillId: skill.id,
            skillValue: 50,
          },
        },
      })

      expect(response).toMatchObject({
        data: {
          createProjectSkill: {
            id: expect.stringMatching(uuidRegex),
          },
        },
      })
    })
  })
})
