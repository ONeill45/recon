import faker from 'faker'

import { ResourceDetailCards } from 'components'
import { ResourceFactory } from '../factories'
import { render } from '../testUtils'
import { DateFormat, formatDate, getDuration } from 'utils'

describe('<ResourceDetailCards />', () => {
  it('should initialize resource details for active employee', async () => {
    const resource = ResourceFactory.build()
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
  })
  it('should initialize resource details for terminated employee', async () => {
    const resource = ResourceFactory.build({
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
  })
})
