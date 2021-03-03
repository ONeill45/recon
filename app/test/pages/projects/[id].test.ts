import Project, { GET_PROJECT } from 'pages/projects/[id]'
import { GET_ALL_RESOURCES } from 'pages/resources'
import { ProjectFactory, ResourceFactory } from '../../factories'
import { applyMockUseRouter, render } from '../../testUtils'

const project = ProjectFactory.build()
const resources = ResourceFactory.buildList(5)

applyMockUseRouter({ query: { id: project.id } })

const mocks = [
  {
    request: {
      query: GET_PROJECT,
      variables: {
        id: project.id,
      },
    },
    result: {
      data: {
        project,
      },
    },
  },
  {
    request: {
      query: GET_ALL_RESOURCES,
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
      query: GET_PROJECT,
      variables: {
        id: project.id,
      },
    },
    error: new Error('An error occurred'),
  },
  {
    request: {
      query: GET_ALL_RESOURCES,
    },
    error: new Error('An error occurred'),
  },
]

describe('Individual project page test', () => {
  it('should render page for a single project and display Loading...', async () => {
    const { getByText } = await render(Project, {}, mocks, false)
    expect(getByText('Loading...')).toBeVisible()
  })
  it('should fetch the requested project and display more details', async () => {
    const { getByText } = await render(Project, {}, mocks)

    expect(getByText(`${project.projectName}`)).toBeVisible()
  })
  it('should show error message when an error occurs', async () => {
    const { getByText } = await render(Project, {}, errorMocks)

    expect(getByText('Error: An error occurred')).toBeVisible()
  })
})
