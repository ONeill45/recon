import { shallow } from 'enzyme'
import { matchers } from '@emotion/jest'
import { NavButtons, NavButton } from '../../src/components'
import { DisplayType } from '../../src/interfaces'

expect.extend(matchers)

const buttonProperties = [
  {
    title: 'Home',
    route: '/',
  },
  {
    title: 'Clients',
    route: '/clients',
  },
  {
    title: 'Projects',
    route: '/projects',
  },
  {
    title: 'Resources',
    route: '/resources',
  },
]
const displayType = DisplayType.ROW

const useRouter = jest.spyOn(require('next/router'), 'useRouter')
const pushHandler = jest.fn()
useRouter.mockImplementation(() => ({
  pathname: '/home',
  push: pushHandler,
}))

const renderWrapper = (
  buttonProperties: { title: string; route: string }[],
  displayType: DisplayType,
) =>
  shallow(
    <NavButtons
      buttonProperties={buttonProperties}
      displayType={displayType}
    />,
  )

describe('<NavButtons />', () => {
  it('should match snapshot', () => {
    const wrapper = renderWrapper(buttonProperties, displayType)
    expect(wrapper).toMatchSnapshot()
  })

  it('should render NavButtons in row', () => {
    const wrapper = renderWrapper(buttonProperties, displayType)

    expect(wrapper.find(NavButton).length).toEqual(4)
    expect(wrapper.prop('displayType')).toEqual('row')
    expect(wrapper).toHaveStyleRule('flex-direction', 'row')
    expect(wrapper).toHaveStyleRule('padding-left', '20px')
  })

  it('should render NavButtons in column', () => {
    const wrapper = renderWrapper(buttonProperties, DisplayType.COLUMN)

    expect(wrapper.find(NavButton).length).toEqual(4)
    expect(wrapper.prop('displayType')).toEqual('column')
    expect(wrapper).toHaveStyleRule('flex-direction', 'column')
    expect(wrapper).toHaveStyleRule('align-items', 'flex-start')
    expect(wrapper).toHaveStyleRule('width', '100%')
  })

  it('should fail if displayType is invalid', () => {
    const wrapper = renderWrapper(buttonProperties, 'bad' as DisplayType)
    expect(wrapper.prop('displayType')).toEqual('bad')
    expect(wrapper).not.toHaveStyleRule('flex-direction', 'column')
    expect(wrapper).not.toHaveStyleRule('flex-direction', 'row')
  })
})
