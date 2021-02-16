import { MockedProvider } from '@apollo/client/testing'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import faker from 'faker'
import { AccountInfo } from '@azure/msal-browser'

import { NewClientForm } from 'components'
import { gql } from '@apollo/client'

const useRouter = jest.spyOn(require('next/router'), 'useRouter')
const routerPush = jest.fn()
useRouter.mockImplementation(() => ({
  push: routerPush,
}))

const mockAccount = {
  username: faker.internet.email(),
}

const useMsal = jest.spyOn(require('@azure/msal-react'), 'useMsal')
useMsal.mockImplementation(() => ({
  accounts: [mockAccount],
}))

jest.mock('utils/hooks/msal', () => ({
  useMsAccount: jest.fn(() => mockAccount as AccountInfo),
}))

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
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <NewClientForm />
      </MockedProvider>,
    )

    const clientName = await screen.findByLabelText('client-name')
    const description = await screen.findByLabelText('description')
    const logoUrl = await screen.findByLabelText('logo-url')
    const submitButton = screen.getByRole('button', { name: 'Submit' })

    await waitFor(() => {
      fireEvent.change(clientName, { target: { value: 'Test Client' } })
      fireEvent.change(description, { target: { value: 'Test Desc' } })
      fireEvent.change(logoUrl, { target: { value: 'http://test.com' } })
    })
    if (submitButton) fireEvent.click(submitButton)
    await new Promise((resolve) => setTimeout(resolve, 0))
    expect(routerPush).toBeCalled()
  })
})
