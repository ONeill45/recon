import { gql } from '@apollo/client'

import Clients from 'pages/clients'
import { ClientFactory } from '../../factories'
import { render } from '../../testUtils'

const clients = ClientFactory.buildList(5)
const mocks = [
  {
    request: {
      query: gql`
        {
          clients {
            id
            clientName
            description
            logoUrl
            startDate
            endDate
          }
        }
      `,
    },
    result: {
      data: {
        clients,
      },
    },
  },
]

const errorMocks = [
  {
    request: {
      query: gql`
        {
          clients {
            id
            clientName
            description
            logoUrl
            startDate
            endDate
          }
        }
      `,
    },
    error: new Error('An error occurred'),
  },
]

describe('Client page test', () => {
  it('should render client page and display Loading...', async () => {
    const { getByText } = await render(Clients, {}, mocks, false)
    expect(getByText('Loading...')).toBeVisible()
  })
  it('should render clients page and display filter sidebar', async () => {
    const { getByText } = await render(Clients, {}, mocks)
    expect(getByText('Filters')).toBeVisible()
  })
  it('should render clients page and display the footer', async () => {
    const { getByText } = await render(Clients, {}, mocks)
    expect(getByText('Powered by')).toBeVisible()
  })
  it('should fetch all clients and display their cards', async () => {
    const { getByText } = await render(Clients, {}, mocks)

    expect(getByText(`${clients[0].clientName}`)).toBeVisible()
    expect(getByText(`${clients[1].clientName}`)).toBeVisible()
    expect(getByText(`${clients[2].clientName}`)).toBeVisible()
    expect(getByText(`${clients[3].clientName}`)).toBeVisible()
    expect(getByText(`${clients[4].clientName}`)).toBeVisible()
  })
  it('should show error message when an error occurs', async () => {
    const { getByText } = await render(Clients, {}, errorMocks)

    expect(getByText('Error: An error occurred')).toBeVisible()
  })
})
