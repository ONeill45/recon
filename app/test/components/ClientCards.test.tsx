import { shallow } from 'enzyme'
import { ClientCard, ClientCards } from '../../src/components'
import { Client } from '../../src/interfaces'
import { ClientFactory } from '../factories'

const renderWrapper = (clients: Client[]) =>
  shallow(<ClientCards clients={clients} />)

describe('<ClientCards />', () => {
  it('should match snapshot', () => {
    const clients = ClientFactory.buildList(5)
    const wrapper = renderWrapper(clients)
    expect(wrapper).toMatchSnapshot()
  })

  it('should initialize client cards', () => {
    const clients = ClientFactory.buildList(5)

    const wrapper = renderWrapper(clients)
    expect(wrapper.find(ClientCard).length).toEqual(5)
  })
})
