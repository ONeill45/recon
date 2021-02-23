import { render } from '@testing-library/react'
import { getDurationText } from '../../src/utils'
import { ClientCard } from '../../src/components'
import { Client } from '../../src/interfaces'
import { ClientFactory } from '../factories'

const renderComponent = (client: Client) =>
  render(<ClientCard client={client} />)

describe('<ClientCard />', () => {
  it('should initialize client details', () => {
    const client = ClientFactory.build()
    const { clientName, description, startDate, endDate, logoUrl } = client

    const { getByRole, getByText } = renderComponent(client)

    expect(getByRole('img')).toHaveProperty('src', logoUrl)
    expect(getByText(clientName)).toBeVisible()
    expect(getByText(description)).toBeVisible()
    expect(getByText(getDurationText(startDate, endDate))).toBeVisible()
  })
})
