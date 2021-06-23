import faker from 'faker'

import '../utils/populateEnvVariables'
import { connect, disconnect } from '../../src/database'
import { gqlCall } from '../utils/gqlCall'
import {
  ClientFactory,
  DepartmentFactory,
  ProjectFactory,
  ResourceAllocationFactory,
  ResourceFactory,
} from '../factories'
import {
  Client,
  Department,
  Project,
  Resource,
  ResourceAllocation,
} from '../../src/models'
import { uuidRegex } from '../utils/regex'
import { Connection } from 'typeorm'

let connection: Connection
beforeAll(async () => {
  connection = (await connect()).connection
})

afterAll(async () => {
  await disconnect()
})

beforeEach(async () => {
  await connection.synchronize(true)
})

describe('ResourceResolver', () => {
  describe('resources()', () => {
    const query = `{
      resources {
        resources {
          id
          firstName
          lastName
          title
          startDate
          terminationDate
        }
      }
    }`
    it('should return an empty array if no resources exist', async () => {
      const response = await gqlCall({
        source: query,
      })

      expect(response).toEqual({
        data: {
          resources: {
            resources: [],
          },
        },
      })
    })
    it('should return a populated array if resources exist', async () => {
      const department = DepartmentFactory.build()
      const resource = ResourceFactory().build({ department })
      const {
        id,
        firstName,
        lastName,
        title,
        startDate,
        terminationDate,
      } = resource

      await Department.insert(department)
      await Resource.insert(resource)

      const response = await gqlCall({
        source: query,
      })

      if (response) {
        expect(response).toMatchObject({
          data: {
            resources: {
              resources: [
                {
                  id,
                  firstName,
                  lastName,
                  title,
                  startDate: new Date(startDate).toISOString(),
                  terminationDate,
                },
              ],
            },
          },
        })
      }
    })
    it('should not return deleted resources', async () => {
      const department = DepartmentFactory.build()
      const resources = ResourceFactory().buildList(5, {
        deletedDate: new Date().toISOString(),
        department,
      })

      await Department.insert(department)
      await Resource.insert(resources)

      const response = await gqlCall({
        source: query,
      })

      expect(response).toMatchObject({
        data: {
          resources: {
            resources: [],
          },
        },
      })
    })
  })
  describe('resource()', () => {
    const getResourceQuery = (id: string) => `{
      resource (id: "${id}") {
        id
        firstName
        lastName
        title
        startDate
        terminationDate
      }
    }`
    it('should return null if resource does not exist', async () => {
      const response = await gqlCall({
        source: getResourceQuery(faker.random.uuid()),
      })

      expect(response).toEqual({
        data: {
          resource: null,
        },
      })
    })

    it('should return resource if it exists', async () => {
      const department = DepartmentFactory.build()
      const resource = ResourceFactory().build({ department })

      await Department.insert(department)
      await Resource.insert(resource)

      const {
        id,
        firstName,
        lastName,
        title,
        startDate,
        terminationDate,
      } = resource

      const response = await gqlCall({
        source: getResourceQuery(id),
      })

      expect(response).toMatchObject({
        data: {
          resource: {
            id,
            firstName,
            lastName,
            title,
            startDate: new Date(startDate).toISOString(),
            terminationDate,
          },
        },
      })
    })

    it('should return resource with allocations if requested', async () => {
      const getResourceWithAllocationsQuery = (id: string) => `{
        resource (id: "${id}") {
          id
          firstName
          lastName
          title
          startDate
          terminationDate
          resourceAllocations {
            id
            project {
              projectName
            }
          }
        }
      }`
      const department = DepartmentFactory.build()
      const client = ClientFactory.build()
      const projects = ProjectFactory().buildList(2, { client })
      const resource = ResourceFactory().build({ department })
      const resourceAllocations = [
        ResourceAllocationFactory.build({
          resource,
          project: projects[0],
        }),
        ResourceAllocationFactory.build({
          resource,
          project: projects[1],
        }),
      ]

      await Department.insert(department)
      await Client.insert(client)
      await Project.insert(projects[0])
      await Project.insert(projects[1])
      await Resource.insert(resource)
      await ResourceAllocation.insert(resourceAllocations[0])
      await ResourceAllocation.insert(resourceAllocations[1])

      const {
        id,
        firstName,
        lastName,
        title,
        startDate,
        terminationDate,
      } = resource

      const response = await gqlCall({
        source: getResourceWithAllocationsQuery(id),
      })

      expect(response).toMatchObject({
        data: {
          resource: {
            id,
            firstName,
            lastName,
            title,
            startDate: new Date(startDate).toISOString(),
            terminationDate,
            resourceAllocations: [
              {
                id: resourceAllocations[0].id,
                project: {
                  projectName: resourceAllocations[0].project.projectName,
                },
              },
              {
                id: resourceAllocations[1].id,
                project: {
                  projectName: resourceAllocations[1].project.projectName,
                },
              },
            ],
          },
        },
      })
    })

    it('should return resource if the search text matches the first name of a resource', async () => {
      const getResourceWithFirstNameQuery = (searchItem: string) => `{
        resources (searchItem: "${searchItem}") {
          resources {
            id
            firstName
            lastName
            title
            startDate
            terminationDate
          }
        }
      }`

      const department = DepartmentFactory.build()
      const resource = ResourceFactory().build({
        department,
        firstName: 'Kealoha',
      })

      await Department.insert(department)
      await Resource.insert(resource)

      const {
        id,
        firstName,
        lastName,
        title,
        startDate,
        terminationDate,
      } = resource

      const response = await gqlCall({
        source: getResourceWithFirstNameQuery('Kealoha'),
      })

      expect(response).toMatchObject({
        data: {
          resources: {
            resources: [
              {
                id,
                firstName,
                lastName,
                title,
                startDate,
                terminationDate,
              },
            ],
          },
        },
      })
    })

    it('should not return a deleted resource', async () => {
      const department = DepartmentFactory.build()
      const resource = ResourceFactory().build({
        deletedDate: new Date().toISOString(),
        department,
      })

      await Department.insert(department)
      await Resource.insert(resource)

      const response = await gqlCall({
        source: getResourceQuery(resource.id),
      })

      expect(response).toEqual({
        data: {
          resource: null,
        },
      })
    })
  })
  describe('createResource()', () => {
    const createResourceMutation = `
    mutation CreateResource($data: CreateResourceInput!) {
      createResource (data: $data) {
        id
        firstName
        lastName
        title
        department {
          name
        }
        email
        imageUrl
        startDate
        terminationDate
      }
    }`
    it('should return null if resource does not exist', async () => {
      const department = DepartmentFactory.build()
      const resource = ResourceFactory().build({})
      const {
        firstName,
        lastName,
        title,
        email,
        imageUrl,
        startDate,
        createdBy,
        updatedBy,
      } = resource

      await Department.insert(department)

      const response = await gqlCall({
        source: createResourceMutation,
        variableValues: {
          data: {
            firstName,
            lastName,
            title,
            departmentId: department.id,
            email,
            imageUrl,
            startDate,
            createdBy,
            updatedBy,
          },
        },
      })

      expect(response).toMatchObject({
        data: {
          createResource: {
            id: expect.stringMatching(uuidRegex),
            firstName,
            lastName,
            title,
            department: { name: department.name },
            email,
            imageUrl,
            startDate,
            terminationDate: null,
          },
        },
      })
    })

    it('should return error if department does not exist', async () => {
      const invalidDepartmentId = faker.random.uuid()
      const department = DepartmentFactory.build()
      const resource = ResourceFactory().build({
        department,
      })

      await Department.insert(department)
      await Resource.insert(resource)

      const {
        firstName,
        lastName,
        title,
        email,
        imageUrl,
        startDate,
        createdBy,
        updatedBy,
      } = resource

      const { errors } = await gqlCall({
        source: createResourceMutation,
        variableValues: {
          data: {
            firstName,
            lastName,
            title,
            departmentId: invalidDepartmentId,
            email,
            imageUrl,
            startDate,
            createdBy,
            updatedBy,
          },
        },
      })

      expect(errors).toHaveLength(1)

      expect(errors[0].message).toEqual(
        `Department ${invalidDepartmentId} not found!`,
      )
    })
  })

  describe('updateResource()', () => {
    const updateResourceMutation = `
    mutation UpdateResource($data: UpdateResourceInput!, $id: String!) {
      updateResource (data: $data, id: $id) {
        id
        firstName
        lastName
        title
        department {
          name
        }
        email
        imageUrl
        startDate
        terminationDate
      }
    }`
    it('should return error if resource does not exist', async () => {
      const department = DepartmentFactory.build()
      const resource = ResourceFactory().build({})
      const {
        id,
        firstName,
        lastName,
        title,
        email,
        imageUrl,
        startDate,
        updatedBy,
      } = resource

      await Department.insert(department)

      const { data, errors } = await gqlCall({
        source: updateResourceMutation,
        variableValues: {
          data: {
            firstName,
            lastName,
            title,
            departmentId: department.id,
            email,
            imageUrl,
            startDate,
            updatedBy,
          },
          id,
        },
      })

      expect(data).toBeNull()
      expect(errors).toHaveLength(1)

      const notFoundError = errors![0].originalError!
      expect(notFoundError.message).toEqual(`Resource ${id} not found!`)
    })

    it('should return error if updated department does not exist', async () => {
      const invalidDepartmentId = faker.random.uuid()
      const department = DepartmentFactory.build()
      const resource = ResourceFactory().build({
        department,
      })

      await Department.insert(department)
      await Resource.insert(resource)

      const {
        id,
        firstName,
        lastName,
        title,
        email,
        imageUrl,
        startDate,
        updatedBy,
      } = resource

      const { errors } = await gqlCall({
        source: updateResourceMutation,
        variableValues: {
          data: {
            firstName,
            lastName,
            title,
            departmentId: invalidDepartmentId,
            email,
            imageUrl,
            startDate,
            updatedBy,
          },
          id,
        },
      })

      expect(errors).toHaveLength(1)

      expect(errors[0].message).toEqual(
        `Department ${invalidDepartmentId} not found!`,
      )
    })

    it('should return updated resource', async () => {
      const department = DepartmentFactory.build()
      const [resource, updatedResource] = ResourceFactory().buildList(2, {
        department,
      })

      await Department.insert(department)
      await Resource.insert(resource)

      const { id } = resource
      const {
        firstName,
        lastName,
        title,
        email,
        imageUrl,
        startDate,
        updatedBy,
      } = updatedResource

      const response = await gqlCall({
        source: updateResourceMutation,
        variableValues: {
          data: {
            firstName,
            lastName,
            title,
            departmentId: department.id,
            email,
            imageUrl,
            startDate,
            updatedBy,
          },
          id,
        },
      })

      expect(response).toMatchObject({
        data: {
          updateResource: {
            id,
            firstName,
            lastName,
            title,
            department: { name: department.name },
            email,
            imageUrl,
            startDate: new Date(startDate).toISOString(),
          },
        },
      })

      const dbResource = await Resource.findOne(id)
      expect(dbResource).toMatchObject({
        id,
        firstName,
        lastName,
        title,
        startDate: new Date(startDate),
      })
    })
  })

  describe('deleteResource()', () => {
    const deleteResourceMutation = `
    mutation DeleteResource($id: String!) {
      deleteResource (id: $id)
    }`
    it('should return error if resource does not exist', async () => {
      const id = faker.random.uuid()
      const { data, errors } = await gqlCall({
        source: deleteResourceMutation,
        variableValues: {
          id,
        },
      })

      expect(data).toBeNull()
      expect(errors).toHaveLength(1)

      const notFoundError = errors![0].originalError!
      expect(notFoundError.message).toEqual(`Resource ${id} not found!`)
    })

    it('should return updated resource', async () => {
      const department = DepartmentFactory.build()
      const resource = ResourceFactory().build({ department })
      await Department.insert(department)
      await Resource.insert(resource)

      const { id } = resource

      const response = await gqlCall({
        source: deleteResourceMutation,
        variableValues: {
          id,
        },
      })

      expect(response).toMatchObject({
        data: {
          deleteResource: true,
        },
      })

      const dbResource = await Resource.findOne({
        where: { id },
        withDeleted: true,
      })

      expect(dbResource).toBeTruthy()
      expect(dbResource.deletedDate).toBeTruthy()
    })
  })
})
