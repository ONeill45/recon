import faker from 'faker'

import '../utils/populateEnvVariables'
import { connect, disconnect } from '../../src/database'
import { gqlCall } from '../utils/gqlCall'
import { ResourceFactory } from '../factories'
import { Resource } from '../../src/models'
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
        id
        firstName
        lastName
        title
        startDate
        terminationDate
      }
    }`
    it('should return an empty array if no resources exist', async () => {
      const response = await gqlCall({
        source: query,
      })

      expect(response).toEqual({
        data: {
          resources: [],
        },
      })
    })
    it('should return a populated array if resources exist', async () => {
      const resource = ResourceFactory.build()
      const {
        id,
        firstName,
        lastName,
        title,
        startDate,
        terminationDate,
      } = resource
      await Resource.insert(resource)
      const response = await gqlCall({
        source: query,
      })

      expect(response).toMatchObject({
        data: {
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
      })
    })
    it('should not return deleted resources', async () => {
      const resources = ResourceFactory.buildList(5, {
        deletedDate: new Date().toISOString(),
      })

      await Resource.insert(resources)

      const response = await gqlCall({
        source: query,
      })

      expect(response).toMatchObject({
        data: {
          resources: [],
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
      const resource = ResourceFactory.build()

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

    it('should not return a deleted resource', async () => {
      const resource = ResourceFactory.build({
        deletedDate: new Date().toISOString(),
      })

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
        startDate
        terminationDate
      }
    }`
    it('should return null if resource does not exist', async () => {
      const resource = ResourceFactory.build({})
      const {
        firstName,
        lastName,
        title,
        startDate,
        createdBy,
        updatedBy,
      } = resource

      const response = await gqlCall({
        source: createResourceMutation,
        variableValues: {
          data: {
            firstName,
            lastName,
            title,
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
            startDate,
            terminationDate: null,
          },
        },
      })
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
        startDate
        terminationDate
      }
    }`
    it('should return error if resource does not exist', async () => {
      const resource = ResourceFactory.build({})
      const { id, firstName, lastName, title, startDate, updatedBy } = resource

      const { data, errors } = await gqlCall({
        source: updateResourceMutation,
        variableValues: {
          data: {
            firstName,
            lastName,
            title,
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

    it('should return updated resource', async () => {
      const [resource, updatedResource] = ResourceFactory.buildList(2)
      await Resource.insert(resource)

      const { id } = resource
      const {
        firstName,
        lastName,
        title,
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
      const resource = ResourceFactory.build()
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
