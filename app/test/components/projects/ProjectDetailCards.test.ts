import faker from 'faker'

import { ProjectDetailCards } from 'components/projects/ProjectDetailCards'
import { ProjectFactory, ResourceFactory } from '../../factories'
import { render } from '../../testUtils'
import { DateFormat, formatDate, getDuration } from 'utils'

describe('<ProjectDetailCards />', () => {
  it('should initialize project details for active project', async () => {
    const resources = ResourceFactory().buildList(5)
    const project = ProjectFactory([
      { resource: resources[0], isCurrent: true },
      { resource: resources[1], isCurrent: true },
      { resource: resources[2], isCurrent: true },
      { resource: resources[3], isCurrent: true },
      { resource: resources[4], isCurrent: false },
    ]).build()
    const { startDate } = project

    const { getByText } = await render(ProjectDetailCards, {
      project,
    })
    expect(getByText('Status: Active')).toBeVisible()
    expect(getByText('End Date: N/A')).toBeVisible()
    expect(
      getByText(`Length Of Project: ${getDuration(startDate)}`),
    ).toBeVisible()
  })
  it('should initialize project details for terminated project', async () => {
    const resources = ResourceFactory().buildList(5)
    const project = ProjectFactory([
      { resource: resources[0], isCurrent: true },
      { resource: resources[1], isCurrent: true },
      { resource: resources[2], isCurrent: true },
      { resource: resources[3], isCurrent: false },
      { resource: resources[4], isCurrent: false },
    ]).build({
      endDate: faker.date.past(),
    })
    const { startDate, endDate } = project

    const { getByText } = await render(ProjectDetailCards, {
      project,
    })
    expect(getByText('Status: Terminated')).toBeVisible()
    expect(
      getByText(`End Date: ${formatDate(endDate, DateFormat.DATE_ONLY)}`),
    ).toBeVisible()
    expect(
      getByText(`Length Of Project: ${getDuration(startDate, endDate)}`),
    ).toBeVisible()
  })
})
