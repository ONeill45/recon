import { waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import faker from 'faker'

import { ClientForm } from 'components/clients/ClientForm'
import { CREATE_CLIENT, UPDATE_CLIENT } from 'queries'
import { render, applyMockUseMsal, applyMockUseRouter } from '../../testUtils'
import { ClientFactory } from '../../factories'

applyMockUseRouter()

applyMockUseMsal()

// eslint-disable-next-line @typescript-eslint/no-var-requires
jest.mock('utils/hooks/msal', () => require('../../testUtils').mockMsalHook)

describe('<ClientForm />', () => {
  it('should create a new client with user provided info', async () => {
    const mocks = [
      {
        request: {
          query: CREATE_CLIENT,
        },
        result: {
          data: {
            id: faker.random.uuid,
          },
        },
      },
    ]

    const { getByTestId } = await render(ClientForm, {}, mocks, false)

    const [clientName, description, logoUrl] = [
      'client-name-field',
      'description-field',
      'logo-url-field',
    ].map((text) => getByTestId(text))

    await waitFor(() => {
      userEvent.type(clientName, 'Test Client')
      userEvent.type(description, 'Test Desc')
      userEvent.type(logoUrl, 'http://test.com')
    })
    await new Promise((resolve) => setTimeout(resolve, 0))
  })

  it('should update a client with user provided info', async () => {
    const client = ClientFactory().build()

    const mocks = [
      {
        request: {
          query: UPDATE_CLIENT,
        },
        result: {
          data: {
            id: client.id,
          },
        },
      },
    ]

    const { getByTestId } = await render(ClientForm, { client }, mocks, false)

    expect(getByTestId('client-name-field')).toHaveValue(client.clientName)
    expect(getByTestId('description-field')).toHaveValue(client.description)

    await new Promise((resolve) => setTimeout(resolve, 0))
  })
})
