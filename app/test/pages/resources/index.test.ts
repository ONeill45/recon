import { gql } from '@apollo/client'

import Resources from 'pages/resources'
import { ResourceFactory } from '../../factories'
import { render } from '../../testUtils'

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

describe('Resource page test', () => {
  it('should render resource page and display Loading...', async () => {
    const { getByText } = await render(Resources, {}, mocks, false)
    expect(getByText('Loading...')).toBeVisible()
  })
  it('should fetch all resources and display their cards', async () => {
    const { getByText } = await render(Resources, {}, mocks)

    expect(getByText(`${resources[0].email}`)).toBeVisible()
    expect(getByText(`${resources[1].email}`)).toBeVisible()
    expect(getByText(`${resources[2].email}`)).toBeVisible()
    expect(getByText(`${resources[3].email}`)).toBeVisible()
    expect(getByText(`${resources[4].email}`)).toBeVisible()
  })
  it('should show error message when an error occurs', async () => {
    const { getByText } = await render(Resources, {}, errorMocks)

    expect(getByText('Error: An error occurred')).toBeVisible()
  })
})
