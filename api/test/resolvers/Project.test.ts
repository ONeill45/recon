import { Connection } from 'typeorm'

import '../utils/populateEnvVariables'
import { connect } from '../../src/database'
import { Project, Client } from '../../src/models'
import { ProjectFactory } from '../factories'
import { gqlCall } from '../utils/gqlCall'

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

describe('ProjectResolver', () => {
  describe('projects()', () => {
    const query = `{
      projects {
        id
        projectName
        startDate
        endDate
        projectType
        priority
        confidence
        client {
          clientName
        }
      }
    }`

    it('should return an empty array if no projects exist', async () => {
      const response = await gqlCall({
        source: query,
      })

      expect(response).toEqual({
        data: {
          projects: [],
        },
      })
    })
    it('should return a populated array if projects exist', async () => {
      const project = ProjectFactory.build()
      const {
        id,
        projectName,
        startDate,
        endDate,
        projectType,
        priority,
        confidence,
        client,
      } = project
      const { clientName } = client
      await Client.insert(client)
      await Project.insert(project)
      const response = await gqlCall({
        source: query,
      })

      expect(response).toMatchObject({
        data: {
          projects: [
            {
              id,
              projectName,
              startDate,
              endDate,
              projectType,
              priority,
              confidence,
              client: {
                clientName,
              },
            },
          ],
        },
      })
    })
    it('should not return deleted projects', async () => {
      const projects = ProjectFactory.buildList(5, {
        deletedDate: new Date().toISOString(),
      })

      const clients = projects.map((project) => project.client)
      await Client.insert(clients)
      await Project.insert(projects)

      const response = await gqlCall({
        source: query,
      })

      expect(response).toMatchObject({
        data: {
          projects: [],
        },
      })
    })
  })
})
