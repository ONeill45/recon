import { gql } from '@apollo/client'
import { MockedProvider } from '@apollo/client/testing'
import { render, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import faker from 'faker'

import { NewClientForm } from 'components'
import { applyMockUseMsal, applyMockUseRouter } from '../testUtils'

applyMockUseRouter()

applyMockUseMsal()

jest.mock('utils/hooks/msal', () => require('../testUtils').mockMsalHook)

describe('<NewClientForm />', () => {
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
    const { getByLabelText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <NewClientForm />
      </MockedProvider>,
    )

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
})
