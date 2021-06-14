import faker from 'faker'

import { ResourceDetails } from 'components/resources/ResourceDetails'
import { ResourceFactory } from '../../factories'
import { render } from '../../testUtils'
import { DateFormat, formatDate, getDuration } from 'utils'

describe('<ResourceAllocation />', () => {
  it('should initialize resource details for active employee', async () => {
    const resource = ResourceFactory().build()
    const { department, startDate } = resource

    const { getByText } = await render(ResourceDetails, { resource })
    expect(getByText('Status')).toBeVisible()
    expect(getByText('Department')).toBeVisible()
    expect(getByText('Hire Date')).toBeVisible()
    expect(getByText('Termination Date')).toBeVisible()
    expect(getByText('Length of Service')).toBeVisible()

    expect(getByText('Active')).toBeVisible()
    expect(getByText(department.name)).toBeVisible()
    expect(getByText(formatDate(startDate, DateFormat.DATE_ONLY))).toBeVisible()
    expect(getByText('N/A')).toBeVisible()
    expect(getByText(getDuration(startDate))).toBeVisible()
  })
  it('should initialize resource details for terminated employee', async () => {
    const resource = ResourceFactory().build({
      terminationDate: faker.date.past(),
    })
    const { department, startDate, terminationDate } = resource

    const { getByText } = await render(ResourceDetails, { resource })
    expect(getByText('Status')).toBeVisible()
    expect(getByText('Department')).toBeVisible()
    expect(getByText('Hire Date')).toBeVisible()
    expect(getByText('Termination Date')).toBeVisible()
    expect(getByText('Length of Service')).toBeVisible()

    expect(getByText('Terminated')).toBeVisible()
    expect(getByText(department.name)).toBeVisible()
    expect(getByText(formatDate(startDate, DateFormat.DATE_ONLY))).toBeVisible()
    expect(
      getByText(formatDate(terminationDate, DateFormat.DATE_ONLY)),
    ).toBeVisible()
    expect(getByText(getDuration(startDate, terminationDate))).toBeVisible()
  })
})
