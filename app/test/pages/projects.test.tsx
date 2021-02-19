import React from 'react'
import Projects from 'pages/projects'
import { ProjectFactory } from '../factories'
import { MockedProvider } from '@apollo/client/testing'
import { gql } from '@apollo/client'
import { render, screen, waitFor } from '@testing-library/react'

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
    render(
      <MockedProvider mocks={mocks}>
        <Projects />
      </MockedProvider>,
    )

    expect(screen.getByText('Loading...')).toBeVisible()
  })
  it('should fetch all projects and display their cards', async () => {
    await renderComponent(mocks)

    expect(screen.queryByText(`${projects[0].projectName}`)).toBeVisible()
    expect(screen.queryByText(`${projects[1].projectName}`)).toBeVisible()
    expect(screen.queryByText(`${projects[2].projectName}`)).toBeVisible()
    expect(screen.queryByText(`${projects[3].projectName}`)).toBeVisible()
    expect(screen.queryByText(`${projects[4].projectName}`)).toBeVisible()
  })
  it('should show error message when an error occurs', async () => {
    await renderComponent(errorMocks)

    expect(screen.getByText('Error: An error occurred')).toBeVisible()
  })
})
