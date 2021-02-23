import { render } from '@testing-library/react'
import { ClientCards } from '../../src/components'
import { Client } from '../../src/interfaces'
import { ClientFactory } from '../factories'

const renderComponent = (clients: Client[]) =>
  render(<ClientCards clients={clients} />)

describe('<ClientCards />', () => {
  it('should initialize client cards', () => {
    const clients = ClientFactory.buildList(5)
    const { getByText } = renderComponent(clients)

    expect(getByText(clients[0].clientName)).toBeVisible()
    expect(getByText(clients[1].clientName)).toBeVisible()
    expect(getByText(clients[2].clientName)).toBeVisible()
    expect(getByText(clients[3].clientName)).toBeVisible()
    expect(getByText(clients[4].clientName)).toBeVisible()
  })
})
