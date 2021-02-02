import { shallow } from 'enzyme'
import { matchers } from '@emotion/jest'
import {
  FilterCategory,
  FilterCategoryContentDiv,
  FilterCategoryHeaderDiv,
} from '../../src/components'

expect.extend(matchers)

const renderWrapper = () => shallow(<FilterCategory title="test" />)

describe('<FilterCategory />', () => {
  it('should match snapshot', () => {
    const wrapper = renderWrapper()
    expect(wrapper).toMatchSnapshot()
  })

  it('should not show expanded filter category content by default', () => {
    const wrapper = renderWrapper()

    expect(wrapper.find(FilterCategoryContentDiv).length).toBe(0)
  })

  it('should show expanded filter category content when header is clicked', () => {
    const wrapper = renderWrapper()
    wrapper.find(FilterCategoryHeaderDiv).simulate('click')

    expect(wrapper.find(FilterCategoryContentDiv).length).toBe(1)
  })
})
