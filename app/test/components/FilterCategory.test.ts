import userEvent from '@testing-library/user-event'

import {
  FilterCategory,
  GET_ALL_CLIENTS_NAME,
  GET_ALL_DEPARTMENTS,
  GET_ALL_PROJECTS_NAME,
  GET_ALL_RESOURCE_TITLE,
} from 'components'
import {
  ClientFactory,
  ProjectFactory,
  DepartmentFactory,
  ResourceFactory,
} from '../factories'
import { render } from '../testUtils'

const title = 'test'
const data = {
  target: {
    name: 'title',
    checked: 'checked',
  },
  field: 'checkbox',
  name: 'software developer',
}
const clients = ClientFactory().buildList(5)

const resources = ResourceFactory().buildList(2)
const projects = ProjectFactory().buildList(5)
const departmants = DepartmentFactory().buildList(5)
const mockProjects = [
  {
    request: {
      query: GET_ALL_PROJECTS_NAME,
    },
    result: {
      data: {
        projects,
      },
    },
  },
]

describe('<FilterCategory />', () => {
  it('should not show expanded filter category content by default', async () => {
    const { queryByTestId, getByText } = await render(
      FilterCategory,
      {
        title,
      },
      mockProjects,
    )

    expect(queryByTestId('FilterCategoryContent')).toBeNull()
    expect(getByText(title)).toBeVisible()
  })

  it('should show expanded filter category content when header is clicked', async () => {
    const { getByTestId, getByText } = await render(
      FilterCategory,
      {
        title,
      },
      mockProjects,
    )

    userEvent.click(getByText(title))

    expect(getByTestId('FilterCategoryContent')).toBeVisible()
  })
})
