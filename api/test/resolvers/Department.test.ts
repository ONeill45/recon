import { Connection } from 'typeorm'

import '../utils/populateEnvVariables'
import { connect } from '../../src/database'
import { Department } from '../../src/models'
import { DepartmentFactory } from '../factories'
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

describe('DepartmentResolver', () => {
  describe('departments()', () => {
    const query = `{
    departments {
      id
      name
    }
  }`
    it('should return an empty array if no departments exist', async () => {
      const response = await gqlCall({
        source: query,
      })

      expect(response).toEqual({
        data: {
          departments: [],
        },
      })
    })
    it('should return a populated array if departments exist', async () => {
      const department = DepartmentFactory.build()
      const { id, name } = department
      await Department.insert(department)
      const response = await gqlCall({
        source: query,
      })

      expect(response).toMatchObject({
        data: {
          departments: [
            {
              id,
              name,
            },
          ],
        },
      })
    })
  })
})
