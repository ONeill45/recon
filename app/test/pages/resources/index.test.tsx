import React from 'react'
import Resources from '../../../src/pages/resources'
import { ResourceFactory } from '../../factories'
import { MockedProvider } from '@apollo/client/testing'
import { gql } from '@apollo/client'
import { render, waitFor } from '@testing-library/react'

const resources = ResourceFactory.buildList(5)
const mocks = [
  {
    request: {
      query: gql`
        {
          resources {
            id
            firstName
            lastName
            preferredName
            title
            startDate
            terminationDate
            imageUrl
            department {
              name
            }
            email
          }
        }
      `,
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
      query: gql`
        {
          resources {
            id
            firstName
            lastName
            preferredName
            title
            startDate
            terminationDate
            imageUrl
            department {
              name
            }
            email
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
      <Resources />
    </MockedProvider>,
  )

  if (!waitForRender) return component

  await waitFor(() => new Promise((resolve) => setTimeout(resolve, 0)))
  return component
}

describe('Resource page test', () => {
  it('should render resource page and display Loading...', async () => {
    const { queryByText } = await renderComponent(mocks, false)
    expect(queryByText('Loading...')).toBeVisible()
  })
  it('should fetch all resources and display their cards', async () => {
    const { queryByText } = await renderComponent(mocks)

    expect(queryByText(`${resources[0].email}`)).toBeVisible()
    expect(queryByText(`${resources[1].email}`)).toBeVisible()
    expect(queryByText(`${resources[2].email}`)).toBeVisible()
    expect(queryByText(`${resources[3].email}`)).toBeVisible()
    expect(queryByText(`${resources[4].email}`)).toBeVisible()
  })
  it('should show error message when an error occurs', async () => {
    const { getByText } = await renderComponent(errorMocks)

    expect(getByText('Error: An error occurred')).toBeVisible()
  })
})
