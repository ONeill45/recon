import { waitFor } from '@testing-library/react'
import Projects from 'pages/projects'
import { GET_PROJECTS } from 'queries'
import { ProjectFactory } from '../../factories'
import { render } from '../../testUtils/render'

const projects = ProjectFactory().buildList(5)

const count = 5

const mocks = [
  {
    request: {
      query: GET_PROJECTS,
      variables: {
        searchItem: '',
        pagination: {
          page: 1,
          itemsPerPage: 10,
        },
      },
    },
    result: {
      data: {
        projects: {
          projects: projects,
          count,
        },
      },
    },
  },
]

const errorMocks = [
  {
    request: {
      query: GET_PROJECTS,
      variables: {
        searchItem: '',
        pagination: {
          page: 1,
          itemsPerPage: 10,
        },
      },
    },
    error: new Error('An error occurred'),
  },
]

describe('Projects page test', () => {
  it('should render projects page and display Loading...', async () => {
    const { getByText, container } = await render(Projects, {}, mocks)
    waitFor(() => expect(getByText('Loading...')).toBeVisible(), {
      container: container,
    })
  })
  it('should fetch all projects and display their cards', async () => {
    const { getByText, getByTestId } = await render(Projects, {}, mocks)

    await new Promise((resolve) => setTimeout(resolve, 0))

    expect(getByTestId('FilterPanelButton')).toBeVisible()

    expect(getByText(`${projects[0].projectName}`)).toBeVisible()
    expect(getByText(`${projects[1].projectName}`)).toBeVisible()
    expect(getByText(`${projects[2].projectName}`)).toBeVisible()
    expect(getByText(`${projects[3].projectName}`)).toBeVisible()
    expect(getByText(`${projects[4].projectName}`)).toBeVisible()
  })
  it('should show error message when an error occurs', async () => {
    const { getByText } = await render(Projects, {}, errorMocks)

    await new Promise((resolve) => setTimeout(resolve, 0))

    expect(getByText('Error: An error occurred')).toBeVisible()
  })
})
