import faker from 'faker'

import { ResourceDetailCards } from 'components'
import { ProjectFactory, ResourceFactory } from '../factories'
import { render } from '../testUtils'
import { DateFormat, formatDate, getDuration } from 'utils'

describe('<ResourceDetailCards />', () => {
  it('should initialize resource details for active employee', async () => {
    const projects = ProjectFactory().buildList(2)
    const resource = ResourceFactory([
      { project: projects[0], isCurrent: true },
      { project: projects[1], isCurrent: false },
    ]).build()
    const {
      department: { name: departmentName },
      startDate,
    } = resource

    const { getByText } = await render(ResourceDetailCards, {
      resource,
    })
    expect(getByText('Active')).toBeVisible()
    expect(getByText(`${departmentName}`)).toBeVisible()
    expect(getByText('N/A')).toBeVisible()
    expect(getByText(`${getDuration(startDate)}`)).toBeVisible()
    expect(getByText(projects[0].projectName)).toBeVisible()
    expect(getByText(projects[1].projectName)).toBeVisible()
  })
  it('should initialize resource details for terminated employee', async () => {
    const projects = ProjectFactory().buildList(2)
    const resource = ResourceFactory([
      { project: projects[0], isCurrent: true },
      { project: projects[1], isCurrent: false },
    ]).build({
      terminationDate: faker.date.past(),
    })
    const {
      department: { name: departmentName },
      startDate,
      terminationDate,
    } = resource

    const { getByText } = await render(ResourceDetailCards, {
      resource,
    })
    expect(getByText('Terminated')).toBeVisible()
    expect(getByText(`${departmentName}`)).toBeVisible()
    expect(
      getByText(`${formatDate(terminationDate, DateFormat.DATE_ONLY)}`),
    ).toBeVisible()
    expect(
      getByText(`${getDuration(startDate, terminationDate)}`),
    ).toBeVisible()
    expect(getByText(projects[0].projectName)).toBeVisible()
    expect(getByText(projects[1].projectName)).toBeVisible()
  })
})
