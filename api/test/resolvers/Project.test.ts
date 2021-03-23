import { Connection } from 'typeorm'
import faker from 'faker'

import '../utils/populateEnvVariables'
import { connect } from '../../src/database'
import {
  Project,
  Client,
  Department,
  Resource,
  ResourceAllocation,
} from '../../src/models'
import {
  ClientFactory,
  DepartmentFactory,
  ProjectFactory,
  ResourceAllocationFactory,
  ResourceFactory,
} from '../factories'
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
      const project = ProjectFactory().build()
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
      const projects = ProjectFactory().buildList(5, {
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
  describe('project()', () => {
    const getProjectQuery = (id: string) => `{
      project (id: "${id}") {
        id
        projectName
        startDate
        endDate
      }
    }`

    it('should return null if project does not exist', async () => {
      const response = await gqlCall({
        source: getProjectQuery(faker.random.uuid()),
      })

      expect(response).toEqual({
        data: {
          project: null,
        },
      })
    })

    it('should return project if it exists', async () => {
      const client = ClientFactory.build()
      await Client.insert(client)
      const project = ProjectFactory().build({ client })
      await Project.insert(project)

      const { id, projectName, startDate, endDate } = project

      const response = await gqlCall({
        source: getProjectQuery(id),
      })

      expect(response).toMatchObject({
        data: {
          project: {
            id,
            projectName,
            startDate,
            endDate,
          },
        },
      })
    })

    it('should return project with resource allocations if requested', async () => {
      const getProjectWithAllocationsQuery = (id: string) => `{
        project (id: "${id}") {
          id
          projectName
          startDate
          endDate
          resourceAllocations {
            id
            resource {
              firstName
              lastName
            }
          }
        }
      }`
      const client = ClientFactory.build()
      await Client.insert(client)
      const project = ProjectFactory().build({ client })
      await Project.insert(project)
      const department = DepartmentFactory.build()
      await Department.insert(department)
      const resources = ResourceFactory().buildList(2, { department })
      await Resource.insert(resources[0])
      await Resource.insert(resources[1])
      const resourceAllocations = [
        ResourceAllocationFactory.build({
          resource: resources[0],
          project,
        }),
        ResourceAllocationFactory.build({
          resource: resources[1],
          project,
        }),
      ]
      await ResourceAllocation.insert(resourceAllocations[0])
      await ResourceAllocation.insert(resourceAllocations[1])

      const { id, projectName, startDate, endDate } = project

      const response = await gqlCall({
        source: getProjectWithAllocationsQuery(id),
      })

      expect(response).toMatchObject({
        data: {
          project: {
            id,
            projectName,
            startDate,
            endDate,
            resourceAllocations: [
              {
                id: resourceAllocations[0].id,
                resource: {
                  firstName: resourceAllocations[0].resource.firstName,
                  lastName: resourceAllocations[0].resource.lastName,
                },
              },
              {
                id: resourceAllocations[1].id,
                resource: {
                  firstName: resourceAllocations[1].resource.firstName,
                  lastName: resourceAllocations[1].resource.lastName,
                },
              },
            ],
          },
        },
      })
    })

    it('should not return a deleted project', async () => {
      const client = ClientFactory.build()
      await Client.insert(client)
      const project = ProjectFactory().build({
        client,
        deletedDate: new Date().toISOString(),
      })
      await Project.insert(project)

      const response = await gqlCall({
        source: getProjectQuery(project.id),
      })

      expect(response).toEqual({
        data: {
          project: null,
        },
      })
    })
  })
})
