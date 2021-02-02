import { shallow } from 'enzyme'
import { matchers } from '@emotion/jest'
import { SearchBar } from '../../src/components'

expect.extend(matchers)

const renderWrapper = () => shallow(<SearchBar />)

describe('<SearchBar />', () => {
  it('should match snapshot', () => {
    const wrapper = renderWrapper()
    expect(wrapper).toMatchSnapshot()
  })
})
