import { gql} from '@apollo/client'

import Client from 'pages/clients/client'
import { ClientFactory } from '../../factories'
import { applyMockUseRouter, render } from '../../testUtils'

const client = ClientFactory.build()

applyMockUseRouter({ query: { id: client.id } })

const GET_CLIENT_FROM_ID = gql`
  query GetClient($id: String!){
    client(id: $id){
      id
      clientName
      description
      logoUrl
      startDate
      endDate
    }
  }
`

const mocks = [
  {
    request: {
      query: GET_CLIENT_FROM_ID,
      variables: {
        id: client.id,
      },
    },
    result: {
      data: {
        client,
      },
    },
  },
]

const mocks_withoutId = [
  {
    request: {
      query: GET_CLIENT_FROM_ID,
      variables: {
        id: null,
      },
    },
    result: {
      data: {}
    },
  },
]

const errorMocks = [
  {
    request: {
      query: GET_CLIENT_FROM_ID,
      variables: {
        id: client.id,
      },
    },
    error: new Error('An error occurred'),
  },
]

describe('Client page test', () => {
  it('should render update client page when client id is passed', async () => {
    const { getByRole } = await render(Client, {}, mocks)

    expect(getByRole('button', { name: 'Update' })).toBeVisible()
  })
  it('should render client page and display Loading...', async () => {
    const { getByText } = await render(Client, {}, mocks, false)
    expect(getByText('Loading...')).toBeVisible()
  })
  it('should fetch client by Id', async () => {
    const { getByLabelText } = await render(Client, {}, mocks)

    expect(getByLabelText(`client-name`)).toHaveValue(client.clientName)
  })
  it('should show error message when an error occurs', async () => {
    const { getByText } = await render(Client, {}, errorMocks)

    expect(getByText('Error: An error occurred')).toBeVisible()
  })

  it('should render new client page when client id is not passed', async () => {
    applyMockUseRouter({ query: { id: null} })
    
    const { getByRole } = await render(Client, {}, mocks_withoutId)

    expect(getByRole('button', { name: 'Submit' })).toBeVisible()
  })

})
