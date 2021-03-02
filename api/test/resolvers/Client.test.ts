import { Connection } from 'typeorm'

import '../utils/populateEnvVariables'
import { connect } from '../../src/database'
import { Client } from '../../src/models'
import { ClientFactory } from '../factories'
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

describe('ClientResolver', () => {
  describe('clients()', () => {
    const query = `{
    clients {
      id
      clientName
      description
      logoUrl
      startDate
      endDate
    }
  }`
    it('should return an empty array if no clients exist', async () => {
      const response = await gqlCall({
        source: query,
      })

      expect(response).toEqual({
        data: {
          clients: [],
        },
      })
    })
    it('should return a populated array if clients exist', async () => {
      const client = ClientFactory.build()
      const { id, clientName, description, logoUrl, startDate } = client
      await Client.insert(client)
      const response = await gqlCall({
        source: query,
      })

      expect(response).toMatchObject({
        data: {
          clients: [
            {
              id,
              clientName,
              description,
              logoUrl,
              startDate,
            },
          ],
        },
      })
    })
    it('should not return deleted clients', async () => {
      const clients = ClientFactory.buildList(5, {
        deletedDate: new Date().toISOString(),
      })

      await Client.insert(clients)

      const response = await gqlCall({
        source: query,
      })

      expect(response).toMatchObject({
        data: {
          clients: [],
        },
      })
    })
  })
})

describe('createClient()', () => {
  const createClientMutation = `
  mutation CreateClient($data: CreateClientInput!) {
    createClient (data: $data) {
      id
      clientName
      description
      logoUrl
      startDate
    }
  }`
  it('should create a client and return it', async () => {
    const client = ClientFactory.build({})
    const {
      clientName,
      description,
      logoUrl,
      startDate,
      createdBy,
      updatedBy,
    } = client

    const response = await gqlCall({
      source: createClientMutation,
      variableValues: {
        data: {
          clientName,
          description,
          logoUrl,
          startDate,
          createdBy,
          updatedBy,
        },
      },
    })

    expect(response).toMatchObject({
      data: {
        createClient: {
          id: expect.stringMatching(uuidRegex),
          clientName,
          description,
          logoUrl,
          startDate,
        },
      },
    })
  })
})

describe('updateClient()', () => {
  const updateClientMutation = `
  mutation UpdateClient($data: UpdateClientInput!, $id: String!) {
    updateClient (data: $data, id: $id) {
      id
      clientName
      description
      logoUrl
      startDate
      endDate
    }
  }`
  it('should return error if Client does not exist', async () => {
    const client = ClientFactory.build({})
    const {
      id,
      clientName,
      description,
      logoUrl,
      startDate,
      endDate,
      updatedBy,
    } = client

    const { data, errors } = await gqlCall({
      source: updateClientMutation,
      variableValues: {
        data: {
         clientName,
          description,
          logoUrl,
          startDate,
          endDate,
          updatedBy,
        },
        id,
      },
    })

    expect(data).toBeNull()
    expect(errors).toHaveLength(1)

    const notFoundError = errors![0].originalError!
    expect(notFoundError.message).toEqual(`Client ${id} not found!`)
  })

  it('should return updated client', async () => {
    const [client, updatedClient] = ClientFactory.buildList(2)

    await Client.insert(client)

    const { id } = client
    const {
      clientName,
      description,
      logoUrl,
      startDate,
      endDate,
      updatedBy,
    } = updatedClient

    const response = await gqlCall({
      source: updateClientMutation,
      variableValues: {
        data: {
          clientName,
          description,
          logoUrl,
          startDate,
          endDate,
          updatedBy,
        },
        id,
      },
    })

    expect(response).toMatchObject({
      data: {
        updateClient: {
          id,
          clientName,
          description,
          logoUrl,
          startDate: new Date(startDate).toISOString(),
          endDate,
          updatedBy,
        },
      },
    })

    const dbClient = await Client.findOne(id)
    expect(dbClient).toMatchObject({
      id,
      clientName,
      description,
      logoUrl,
      startDate: new Date(startDate),
      endDate,
      updatedBy,
    })
  })
})
