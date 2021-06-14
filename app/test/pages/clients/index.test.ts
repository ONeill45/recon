import Clients from 'pages/clients/index'
import { ClientFactory } from '../../factories'
import { render } from '../../testUtils/render'
import { GET_ALL_CLIENTS } from 'queries'

const clients = ClientFactory().buildList(5)

const mocks = [
  {
    request: {
      query: GET_ALL_CLIENTS,
      variables: { searchItem: '' },
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
      query: GET_ALL_CLIENTS,
      variables: { searchItem: '' },
    },
    error: new Error('An error occurred'),
  },
]

describe('Clients page test', () => {
  it('should render clients page and display Loading...', async () => {
    const { getByText } = await render(Clients, {}, mocks, false)
    expect(getByText('Loading...')).toBeVisible()
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
