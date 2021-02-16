import React from 'react'
import Clients from '../../../src/pages/clients'
import { ClientFactory } from '../../factories'
import { MockedProvider } from '@apollo/client/testing'
import { gql } from '@apollo/client'
import { render, screen, waitFor } from '@testing-library/react'

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

const renderComponent = async (mocks: any) => {
  const component = render(
    <MockedProvider mocks={mocks}>
      <Clients />
    </MockedProvider>,
  )
  await waitFor(() => new Promise((resolve) => setTimeout(resolve, 0)))
  return component
}

describe('Client page test', () => {
  it('should render client page and display Loading...', async () => {
    render(
      <MockedProvider mocks={mocks}>
        <Clients />
      </MockedProvider>,
    )

    expect(screen.getByText('Loading...')).toBeVisible()
  })
  it('should fetch all clients and display their cards', async () => {
    await renderComponent(mocks)

    expect(screen.queryByText(`${clients[0].clientName}`)).toBeVisible()
    expect(screen.queryByText(`${clients[1].clientName}`)).toBeVisible()
    expect(screen.queryByText(`${clients[2].clientName}`)).toBeVisible()
    expect(screen.queryByText(`${clients[3].clientName}`)).toBeVisible()
    expect(screen.queryByText(`${clients[4].clientName}`)).toBeVisible()
  })
  it('should show error message when an error occurs', async () => {
    await renderComponent(errorMocks)

    expect(screen.getByText('Error: An error occurred')).toBeVisible()
  })
})
