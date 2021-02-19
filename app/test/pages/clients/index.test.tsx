import React from 'react'
import Clients from '../../../src/pages/clients'
import { ClientFactory } from '../../factories'
import { MockedProvider } from '@apollo/client/testing'
import { gql } from '@apollo/client'
import { render, waitFor } from '@testing-library/react'

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

const renderComponent = async (mocks: any, waitForRender = true) => {
  const component = render(
    <MockedProvider mocks={mocks}>
      <Clients />
    </MockedProvider>,
  )

  if (!waitForRender) return component

  await waitFor(() => new Promise((resolve) => setTimeout(resolve, 0)))
  return component
}

describe('Client page test', () => {
  it('should render client page and display Loading...', async () => {
    const { queryByText } = await renderComponent(mocks, false)
    expect(queryByText('Loading...')).toBeVisible()
  })
  it('should fetch all clients and display their cards', async () => {
    const { queryByText } = await renderComponent(mocks)

    expect(queryByText(`${clients[0].clientName}`)).toBeVisible()
    expect(queryByText(`${clients[1].clientName}`)).toBeVisible()
    expect(queryByText(`${clients[2].clientName}`)).toBeVisible()
    expect(queryByText(`${clients[3].clientName}`)).toBeVisible()
    expect(queryByText(`${clients[4].clientName}`)).toBeVisible()
  })
  it('should show error message when an error occurs', async () => {
    const { getByText } = await renderComponent(errorMocks)

    expect(getByText('Error: An error occurred')).toBeVisible()
  })
})
