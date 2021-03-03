import faker from 'faker'

import { ProjectDetailCards } from 'components'
import { ProjectFactory } from '../factories'
import { render } from '../testUtils'
import { DateFormat, formatDate, getDuration } from 'utils'

describe('<ProjectDetailCards />', () => {
  it('should initialize project details for active project', async () => {
    const project = ProjectFactory.build()
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
    const project = ProjectFactory.build({
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
