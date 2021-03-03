import { gql } from '@apollo/client'
import { waitFor } from '@testing-library/react'
import { render } from '../testUtils'
import userEvent from '@testing-library/user-event'
import faker from 'faker'

import { ClientForm } from 'components'
import { applyMockUseMsal, applyMockUseRouter } from '../testUtils'
import { ClientFactory } from '../factories'

applyMockUseRouter()

applyMockUseMsal()

jest.mock('utils/hooks/msal', () => require('../testUtils').mockMsalHook)

describe('<ClientForm />', () => {
  it('should create a new client with user provided info', async () => {
    const mocks = [
      {
        request: {
          query: gql`
            mutation CreateClient($data: CreateClientInput!) {
              createClient(data: $data) {
                id
              }
            }
          `,
        },
        result: {
          data: {
            id: faker.random.uuid,
          },
        },
      },
    ]

    const { getByLabelText } = await render(ClientForm, {}, mocks, false)

    const [clientName, description, logoUrl] = [
      'client-name',
      'description',
      'logo-url',
    ].map((text) => getByLabelText(text))

    await waitFor(() => {
      userEvent.type(clientName, 'Test Client')
      userEvent.type(description, 'Test Desc')
      userEvent.type(logoUrl, 'http://test.com')
    })
    await new Promise((resolve) => setTimeout(resolve, 0))
  })

  it('should update a client with user provided info', async () => {
    const client = ClientFactory.build()

    const mocks = [
      {
        request: {
          query: gql`
          mutation UpdateClient($id: String!, $data: UpdateClientInput!) {
            updateClient(id:$id, data: $data) {
              id
            }
          }
        `,
        },
        result: {
          data: {
            id: client.id
          },
        },
      },
    ]
 
    const { getByLabelText } = await render(ClientForm, {client}, mocks, false)
    
    expect(getByLabelText('client-name')).toHaveValue(client.clientName)
    expect(getByLabelText('description')).toHaveValue(client.description)

    await new Promise((resolve) => setTimeout(resolve, 0))
  })
})
