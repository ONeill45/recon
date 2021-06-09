import Projects from 'pages/projects'
import { GET_PROJECTS } from 'queries'
import { ProjectFactory } from '../../factories'
import { render } from '../../testUtils/render'

const projects = ProjectFactory().buildList(5)

const mocks = [
  {
    request: {
      query: GET_PROJECTS,
      variables: {
        searchItem: '',
      },
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
      query: GET_PROJECTS,
      variables: {
        searchItem: '',
      },
    },
    error: new Error('An error occurred'),
  },
]

describe('Projects page test', () => {
  it('should render projects page and display Loading...', async () => {
    const { getByText } = await render(Projects, {}, mocks, false)

    expect(getByText('Loading...')).toBeVisible()
  })
  it('should render projects page and display filter sidebar', async () => {
    const { getByTestId } = await render(Projects, {}, mocks)
    expect(getByTestId('FilterPanelButton')).toBeVisible()
  })
  it('should fetch all projects and display their cards', async () => {
    const { getByText } = await render(Projects, {}, mocks)

    expect(getByText(`${projects[0].projectName}`)).toBeVisible()
    expect(getByText(`${projects[1].projectName}`)).toBeVisible()
    expect(getByText(`${projects[2].projectName}`)).toBeVisible()
    expect(getByText(`${projects[3].projectName}`)).toBeVisible()
    expect(getByText(`${projects[4].projectName}`)).toBeVisible()
  })
  it('should show error message when an error occurs', async () => {
    const { getByText } = await render(Projects, {}, errorMocks)

    expect(getByText('Error: An error occurred')).toBeVisible()
  })
})
