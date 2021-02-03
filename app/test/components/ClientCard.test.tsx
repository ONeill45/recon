import { shallow } from 'enzyme'
import { getDurationText } from '../../src/utils'
import {
  CardDescriptionDiv,
  CardDurationDiv,
  CardNameDiv,
  ClientCard,
  LogoImg,
} from '../../src/components'
import { Client } from '../../src/interfaces'
import { ClientFactory } from '../factories'

const renderWrapper = (client: Client) =>
  shallow(<ClientCard client={client} />)

describe('<ClientCard />', () => {
  it('should match snapshot', () => {
    const client = ClientFactory.build()
    const wrapper = renderWrapper(client)
    expect(wrapper).toMatchSnapshot()
  })

  it('should initialize client details', () => {
    const client = ClientFactory.build()
    const { clientName, description, logoUrl, startDate, endDate } = client

    const wrapper = renderWrapper(client)
    expect(wrapper.find(LogoImg).prop('src')).toEqual(logoUrl)
    expect(wrapper.find(CardNameDiv).text()).toEqual(clientName)
    expect(wrapper.find(CardDescriptionDiv).text()).toEqual(description)
    expect(wrapper.find(CardDurationDiv).text()).toEqual(
      getDurationText(startDate, endDate),
    )
  })
})
