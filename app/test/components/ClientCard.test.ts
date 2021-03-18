import { getRelativeTime } from 'utils'
import { ClientCard } from 'components'
import { ClientFactory } from '../factories'
import { render } from '../testUtils'

describe('<ClientCard />', () => {
  it('should initialize client details', async () => {
    const client = ClientFactory.build()
    const { clientName, description, startDate, endDate, logoUrl } = client

    const { getByRole, getByText } = await render(ClientCard, {
      client,
    })

    expect(getByRole('img')).toHaveProperty('src', logoUrl)
    expect(getByText(clientName)).toBeVisible()
    expect(getByText(description)).toBeVisible()
    expect(getByText(getRelativeTime(startDate, endDate))).toBeVisible()
  })
})
