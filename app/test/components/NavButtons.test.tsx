import { AccountInfo } from '@azure/msal-browser'
import { getByTitle, render, screen } from '@testing-library/react'
import { NavButtons, NavButton } from 'components'
import { DisplayType } from 'interfaces'
import {
  mockAccount,
  mockAccessToken,
  mockedUseAccessToken,
  mockedUseMsAccount,
} from '../testUtils'

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
const defaultRoute = '/home'

const navHandler = jest.fn()
jest.spyOn(require('next/router'), 'useRouter').mockImplementation(() => ({
  pathname: defaultRoute,
  push: navHandler,
}))

const renderComponent = (
  buttonProperties: { title: string; route: string }[],
  displayType: DisplayType,
) =>
  render(
    <NavButtons
      buttonProperties={buttonProperties}
      displayType={displayType}
    />,
  )

describe('<NavButtons />', () => {
  beforeEach(() => {
    mockedUseMsAccount.mockImplementation(() => mockAccount as AccountInfo)
    mockedUseAccessToken.mockImplementation(() => mockAccessToken)
  })
  it('should not render NavButtons if user is unauthenticated', () => {
    mockedUseMsAccount.mockImplementation(() => null)
    mockedUseAccessToken.mockImplementation(() => undefined)
    const { getByRole } = renderComponent(buttonProperties, displayType)

    // const homeButton = getByTitle('Home')
    expect(getByRole('button')).toEqual(0)
    // expect(wrapper.find(NavButton).length).toEqual(4)
    // expect(wrapper.find('NavButtonsDiv').prop('displayType')).toEqual('row')
    // expect(wrapper.find('NavButtonsDiv')).toHaveStyleRule(
    //   'flex-direction',
    //   'row',
    // )
    // expect(wrapper.find('NavButtonsDiv')).toHaveStyleRule(
    //   'padding-left',
    //   '20px',
    // )
  })

  // it('should render NavButtons in column', () => {
  //   const wrapper = renderComponent(buttonProperties, DisplayType.COLUMN)

  //   expect(wrapper.find(NavButton).length).toEqual(4)
  //   expect(wrapper.find('NavButtonsDiv').prop('displayType')).toEqual('column')
  //   expect(wrapper.find('NavButtonsDiv')).toHaveStyleRule(
  //     'flex-direction',
  //     'column',
  //   )
  //   expect(wrapper.find('NavButtonsDiv')).toHaveStyleRule(
  //     'align-items',
  //     'flex-start',
  //   )
  //   expect(wrapper.find('NavButtonsDiv')).toHaveStyleRule('width', '100%')
  // })

  // it('should fail if displayType is invalid', () => {
  //   const wrapper = renderWrapper(buttonProperties, 'bad' as DisplayType)
  //   expect(wrapper.find('NavButtonsDiv').prop('displayType')).toEqual('bad')
  //   expect(wrapper.find('NavButtonsDiv')).not.toHaveStyleRule(
  //     'flex-direction',
  //     'column',
  //   )
  //   expect(wrapper.find('NavButtonsDiv')).not.toHaveStyleRule(
  //     'flex-direction',
  //     'row',
  //   )
  // })
})
