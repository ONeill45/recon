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
    expect(getByText('Status: Active')).toBeVisible()
    expect(getByText(`Department: ${departmentName}`)).toBeVisible()
    expect(getByText('Termination Date: N/A')).toBeVisible()
    expect(
      getByText(`Length Of Service: ${getDuration(startDate)}`),
    ).toBeVisible()
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
    expect(getByText('Status: Terminated')).toBeVisible()
    expect(getByText(`Department: ${departmentName}`)).toBeVisible()
    expect(
      getByText(
        `Termination Date: ${formatDate(
          terminationDate,
          DateFormat.DATE_ONLY,
        )}`,
      ),
    ).toBeVisible()
    expect(
      getByText(
        `Length Of Service: ${getDuration(startDate, terminationDate)}`,
      ),
    ).toBeVisible()
    expect(getByText(projects[0].projectName)).toBeVisible()
    expect(getByText(projects[1].projectName)).toBeVisible()
  })
})
