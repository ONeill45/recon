import userEvent from '@testing-library/user-event'

import Resources, { GET_RESOURCES } from 'pages/resources'
import { ResourceFactory } from '../../factories'
import { applyMockUseRouter, mockUseRouter, render } from '../../testUtils'

applyMockUseRouter()

const resources = ResourceFactory().buildList(5)

const mocks = [
  {
    request: {
      query: GET_RESOURCES,
    },
    result: {
      data: {
        resources,
      },
    },
  },
]

const errorMocks = [
  {
    request: {
      query: GET_RESOURCES,
    },
    error: new Error('An error occurred'),
  },
]

describe('Resource page test', () => {
  it('should render resource page and display Loading...', async () => {
    const { getByText } = await render(Resources, {}, mocks, false)
    expect(getByText('Loading...')).toBeVisible()
  })
  it('should render resource page and display filter sidebar', async () => {
    const { getByText } = await render(Resources, {}, mocks)
    expect(getByText('Filters')).toBeVisible()
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
  it('should route to appropriate resource page when its card is clicked', async () => {
    const { getByText } = await render(Resources, {}, mocks)

    userEvent.click(getByText(`${resources[0].email}`))
    expect(mockUseRouter.push).toHaveBeenCalledWith({
      pathname: '/resources/[id]',
      query: { id: resources[0].id },
    })
  })
})
