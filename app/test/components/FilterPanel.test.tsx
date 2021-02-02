import { shallow } from 'enzyme'
import { matchers } from '@emotion/jest'
import {
  ExpandedFilterPanelDiv,
  FilterPanel,
  SideFilterPanelDiv,
} from '../../src/components'

expect.extend(matchers)

const renderWrapper = () => shallow(<FilterPanel />)

describe('<FilterPanel />', () => {
  it('should match snapshot', () => {
    const wrapper = renderWrapper()
    expect(wrapper).toMatchSnapshot()
  })

  it('should not show expanded filter panel by default', () => {
    const wrapper = renderWrapper()

    expect(wrapper.find(ExpandedFilterPanelDiv)).toHaveStyleRule(
      'display',
      'none',
    )
  })

  it('should show expanded filter panel when side filter bar is clicked', () => {
    const wrapper = renderWrapper()
    wrapper.find(SideFilterPanelDiv).simulate('click')

    expect(wrapper.find(ExpandedFilterPanelDiv)).toHaveStyleRule(
      'display',
      'flex',
    )
  })
})
