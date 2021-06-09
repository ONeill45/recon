import Resource from 'pages/resources/[id]'
import { ResourceFactory } from '../../factories'
import { applyMockUseRouter, render } from '../../testUtils'
import { GET_RESOURCE } from 'queries'

const resource = ResourceFactory().build()

applyMockUseRouter({ query: { id: resource.id } })

const mocks = [
  {
    request: {
      query: GET_RESOURCE,
      variables: {
        id: resource.id,
      },
    },
    result: {
      data: {
        resource,
      },
    },
  },
]

const errorMocks = [
  {
    request: {
      query: GET_RESOURCE,
      variables: {
        id: resource.id,
      },
    },
    error: new Error('An error occurred'),
  },
]

describe('Individual resource page test', () => {
  it('should render page for a single resource and display Loading...', async () => {
    const { getByText } = await render(Resource, {}, mocks, false)
    expect(getByText('Loading...')).toBeVisible()
  })
  it('should fetch the requested resource and display more details', async () => {
    const { getByText } = await render(Resource, {}, mocks)

    expect(getByText(`${resource.email}`)).toBeVisible()
  })
  it('should show error message when an error occurs', async () => {
    const { getByText } = await render(Resource, {}, errorMocks)

    expect(getByText('Error: An error occurred')).toBeVisible()
  })
})
