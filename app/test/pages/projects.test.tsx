import { MockedProvider } from '@apollo/client/testing'
import { gql } from '@apollo/client'
import { render, waitFor } from '@testing-library/react'

import Projects from 'pages/projects'
import { ProjectFactory } from '../factories'

const projects = ProjectFactory.buildList(5)

const mocks = [
  {
    request: {
      query: gql`
        {
          projects {
            id
            projectName
            startDate
            endDate
            projectType
            priority
            confidence
            client {
              clientName
            }
          }
        }
      `,
    },
    result: {
      data: {
        projects,
      },
    },
  },
]

const errorMocks = [
  {
    request: {
      query: gql`
        {
          projects {
            id
            projectName
            startDate
            endDate
            projectType
            priority
            confidence
            client {
              clientName
            }
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
      <Projects />
    </MockedProvider>,
  )
  await waitFor(() => new Promise((resolve) => setTimeout(resolve, 0)))
  return component
}

describe('Projects page test', () => {
  it('should render projects page and display Loading...', async () => {
    const { getByText } = render(
      <MockedProvider mocks={mocks}>
        <Projects />
      </MockedProvider>,
    )

    expect(getByText('Loading...')).toBeVisible()
  })
  it('should fetch all projects and display their cards', async () => {
    const { getByText } = await renderComponent(mocks)

    expect(getByText(`${projects[0].projectName}`)).toBeVisible()
    expect(getByText(`${projects[1].projectName}`)).toBeVisible()
    expect(getByText(`${projects[2].projectName}`)).toBeVisible()
    expect(getByText(`${projects[3].projectName}`)).toBeVisible()
    expect(getByText(`${projects[4].projectName}`)).toBeVisible()
  })
  it('should show error message when an error occurs', async () => {
    const { getByText } = await renderComponent(errorMocks)

    expect(getByText('Error: An error occurred')).toBeVisible()
  })
})
