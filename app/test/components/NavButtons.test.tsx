import { shallow } from 'enzyme'
import { matchers } from '@emotion/jest'
import { NavButtons, NavButton } from 'components'
import { DisplayType } from 'interfaces'

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
    expect(wrapper.find('NavButtonsDiv').prop('displayType')).toEqual('row')
    expect(wrapper.find('NavButtonsDiv')).toHaveStyleRule(
      'flex-direction',
      'row',
    )
    expect(wrapper.find('NavButtonsDiv')).toHaveStyleRule(
      'padding-left',
      '20px',
    )
  })

  it('should render NavButtons in column', () => {
    const wrapper = renderWrapper(buttonProperties, DisplayType.COLUMN)

    expect(wrapper.find(NavButton).length).toEqual(4)
    expect(wrapper.find('NavButtonsDiv').prop('displayType')).toEqual('column')
    expect(wrapper.find('NavButtonsDiv')).toHaveStyleRule(
      'flex-direction',
      'column',
    )
    expect(wrapper.find('NavButtonsDiv')).toHaveStyleRule(
      'align-items',
      'flex-start',
    )
    expect(wrapper.find('NavButtonsDiv')).toHaveStyleRule('width', '100%')
  })

  it('should fail if displayType is invalid', () => {
    const wrapper = renderWrapper(buttonProperties, 'bad' as DisplayType)
    expect(wrapper.find('NavButtonsDiv').prop('displayType')).toEqual('bad')
    expect(wrapper.find('NavButtonsDiv')).not.toHaveStyleRule(
      'flex-direction',
      'column',
    )
    expect(wrapper.find('NavButtonsDiv')).not.toHaveStyleRule(
      'flex-direction',
      'row',
    )
  })
})
