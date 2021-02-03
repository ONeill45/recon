import { loadEnvironmentVariable } from 'utils/functions'

describe('loadEnviromentVariable', () => {
  it('should return the value if the value exists', () => {
    expect(loadEnvironmentVariable('value', 'key')).toEqual('value')
  })
  it('should throw an error if the env variable does not exist', () => {
    const key = 'key'
    try {
      loadEnvironmentVariable(undefined, key)
    } catch (error) {
      expect(error.message).toBe(`Must configure ${key} environment variable.`)
    }
  })
})
