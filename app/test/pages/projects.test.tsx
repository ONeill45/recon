import { gql } from '@apollo/client'

import Projects from 'pages/projects'
import { ProjectFactory } from '../factories'
import { renderComponent } from '../testUtils/render'

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

describe('Projects page test', () => {
  it('should render projects page and display Loading...', async () => {
    const { getByText } = await renderComponent(Projects, {}, mocks, false)

    expect(getByText('Loading...')).toBeVisible()
  })
  it('should fetch all projects and display their cards', async () => {
    const { getByText } = await renderComponent(Projects, {}, mocks)

    expect(getByText(`${projects[0].projectName}`)).toBeVisible()
    expect(getByText(`${projects[1].projectName}`)).toBeVisible()
    expect(getByText(`${projects[2].projectName}`)).toBeVisible()
    expect(getByText(`${projects[3].projectName}`)).toBeVisible()
    expect(getByText(`${projects[4].projectName}`)).toBeVisible()
  })
  it('should show error message when an error occurs', async () => {
    const { getByText } = await renderComponent(Projects, {}, errorMocks)

    expect(getByText('Error: An error occurred')).toBeVisible()
  })
})
