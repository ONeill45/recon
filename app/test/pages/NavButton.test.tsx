import { shallow } from 'enzyme'
import { matchers } from '@emotion/jest'
import { NavButton } from '../../src/components'
import { DisplayType } from '../../src/interfaces'

expect.extend(matchers)

const title = 'Home'
const route = '/home'
const displayType = DisplayType.ROW

const useRouter = jest.spyOn(require('next/router'), 'useRouter')
const pushHandler = jest.fn()
useRouter.mockImplementation(() => ({
  pathname: '/home',
  push: pushHandler,
}))

const renderWrapper = (
  title: string,
  route: string,
  displayType: DisplayType,
) =>
  shallow(<NavButton title={title} route={route} displayType={displayType} />)

describe('<NavButton />', () => {
  it('should match snapshot', () => {
    const wrapper = renderWrapper(title, route, displayType)
    expect(wrapper).toMatchSnapshot()
  })

  it('should render a selected NavButton in row', () => {
    const wrapper = renderWrapper(title, route, displayType)

    expect(wrapper.prop('children')).toEqual(title)
    expect(wrapper.prop('selected')).toEqual(true)
    expect(wrapper).toHaveStyleRule('color', 'white')
    expect(wrapper).toHaveStyleRule('padding', '0 12px')
  })

  it('should render a unselected NavButton in row', () => {
    const wrapper = renderWrapper(title, '/resources', displayType)

    expect(wrapper.prop('children')).toEqual(title)
    expect(wrapper.prop('selected')).toEqual(false)
    expect(wrapper).toHaveStyleRule('color', 'black')
    expect(wrapper).toHaveStyleRule('padding', '0 12px')
  })

  it('should render a selected NavButton in column', () => {
    const wrapper = renderWrapper(title, route, DisplayType.COLUMN)

    expect(wrapper.prop('children')).toEqual(title)
    expect(wrapper.prop('selected')).toEqual(true)
    expect(wrapper).toHaveStyleRule('color', 'white')
    expect(wrapper).toHaveStyleRule('padding', '12px')
  })

  it('should render a unselected NavButton in column', () => {
    const wrapper = renderWrapper(title, '/resources', DisplayType.COLUMN)

    expect(wrapper.prop('children')).toEqual(title)
    expect(wrapper.prop('selected')).toEqual(false)
    expect(wrapper).toHaveStyleRule('color', 'black')
    expect(wrapper).toHaveStyleRule('padding', '12px')
  })

  it('simulates click events', () => {
    const wrapper = renderWrapper(title, '/resources', DisplayType.COLUMN)
    wrapper.simulate('click')

    expect(pushHandler).toHaveBeenCalledTimes(1)
  })
})
