import Resources from 'pages/resources'
import { ResourceFactory } from '../../factories'
import { applyMockUseRouter, render } from '../../testUtils'
import { GET_RESOURCES } from 'queries'

applyMockUseRouter()

const resources = ResourceFactory().buildList(5)
const count = 5

const mocks = [
  {
    request: {
      query: GET_RESOURCES,
      variables: {
        searchItem: '',
        pagination: {
          page: 1,
          itemsPerPage: 10,
        },
      },
    },
    result: {
      data: {
        resources: {
          resources: resources,
          count,
        },
      },
    },
  },
]

const errorMocks = [
  {
    request: {
      query: GET_RESOURCES,
      variables: {
        searchItem: '',
        pagination: {
          page: 1,
          itemsPerPage: 10,
        },
      },
    },
    error: new Error('An error occurred'),
  },
]

describe('Resource page test', () => {
  // it('should render resource page and display Loading...', async () => {
  //   const { getByText } = await render(Resources, {}, mocks, false)
  //   expect(getByText('Loading...')).toBeVisible()
  // })
  it('should render resource page and display filter sidebar', async () => {
    const { getByTestId } = await render(Resources, {}, mocks)
    expect(getByTestId('FilterPanelButton')).toBeVisible()
  })
  it('should fetch all resources and display their cards', async () => {
    const { getByText } = await render(Resources, {}, mocks)

    expect(getByText(`${resources[0].email}`)).toBeVisible()
    expect(getByText(`${resources[1].email}`)).toBeVisible()
    expect(getByText(`${resources[2].email}`)).toBeVisible()
    expect(getByText(`${resources[3].email}`)).toBeVisible()
    expect(getByText(`${resources[4].email}`)).toBeVisible()
  })
  it('should show error message when an error occurs', async () => {
    const { getByText } = await render(Resources, {}, errorMocks)

    expect(getByText('Error: An error occurred')).toBeVisible()
  })
})
