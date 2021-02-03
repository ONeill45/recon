import { callMsGraph } from 'utils/functions/msal'

const mockBlob = { length: 0 }
const mockFetch = (url: string) => {
  switch (url) {
    case '/blob': {
      //   const mockSuccessResponse = {};
      // const mockJsonPromise = Promise.resolve(mockSuccessResponse); // 2
      // const mockFetchPromise = Promise.resolve({ // 3
      //   json: () => mockJsonPromise,
      // });
      const response = { mockBlob }
      return Promise.resolve({
        blob: () => response,
      })
    }
    default: {
      const mockJsonResponse = new Response('')
      return Promise.resolve(mockJsonResponse)
    }
  }
}
describe('msal', () => {
  beforeAll(() => (global.fetch = jest.fn(() => mockFetch)))
  it('returns a URL object from a blob', async () => {
    const response = await callMsGraph('/blob', 'token', 'blob')
    expect(response).toEqual(URL.createObjectURL(mockBlob))
  })
})
