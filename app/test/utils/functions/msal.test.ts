import faker from 'faker'
import { callMsGraph } from 'utils/functions'

const blob = new Blob()
const mockBlob = jest.fn().mockResolvedValue(blob)
const mockJson = jest.fn().mockResolvedValue({})
const mockedFetch = jest.fn(() => {
  return Promise.resolve({
    blob: mockBlob,
    json: mockJson,
  })
})

global.fetch = jest.fn().mockImplementation(mockedFetch)
const urlResult = 'http://localhost:3000/test'
global.URL.createObjectURL = jest.fn(() => urlResult)

describe('callMsGraph', () => {
  it('handles a blob response from fetch', async () => {
    const endpoint = '/blob',
      authToken = faker.random.alphaNumeric(20)
    const response = await callMsGraph(endpoint, authToken, 'blob')

    expect(mockedFetch).toHaveBeenCalledWith(endpoint, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'image/jpeg',
      },
    })
    expect(mockBlob).toHaveBeenCalled()
    expect(URL.createObjectURL).toHaveBeenCalledWith(blob)
    expect(response).toEqual(urlResult)
  })
  it('handles a json response from fetch when a json responseType is specified', async () => {
    const endpoint = '/json',
      authToken = faker.random.alphaNumeric(20)
    await callMsGraph(endpoint, authToken, 'json')

    expect(mockedFetch).toHaveBeenCalledWith(endpoint, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      },
    })
    expect(mockJson).toHaveBeenCalled()
  })

  it('handles a json response from fetch when no responseType is specified', async () => {
    const endpoint = '/json',
      authToken = faker.random.alphaNumeric(20)
    await callMsGraph(endpoint, authToken)

    expect(mockedFetch).toHaveBeenCalledWith(endpoint, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      },
    })
    expect(mockJson).toHaveBeenCalled()
  })
})
