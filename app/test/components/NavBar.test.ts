import { act } from 'react-dom/test-utils'
import userEvent from '@testing-library/user-event'

import { NavBar } from 'components'
import { applyMockUseRouter, render, setInnerWidth } from '../testUtils'

applyMockUseRouter()

describe('<NavBar />', () => {
  beforeEach(() => {
    setInnerWidth(1024)
  })

  it('should show the full nav bar by default', async () => {
    const { getByTestId } = await render(NavBar)

    expect(getByTestId('FullNav')).toBeVisible()
    expect(getByTestId('CollapsedNav')).not.toBeVisible()
    expect(getByTestId('SideNav')).not.toBeVisible()
  })

  it('should show the collapsed nav when screen is too small for full nav', async () => {
    setInnerWidth()
    const { getByTestId } = await render(NavBar)

    expect(getByTestId('FullNav')).not.toBeVisible()
    expect(getByTestId('CollapsedNav')).toBeVisible()
    expect(getByTestId('SideNav')).not.toBeVisible()
  })

  it('should collapse nav bar when screen is resized below threshold', async () => {
    const { getByTestId } = await render(NavBar)
    setInnerWidth()
    act(() => {
      global.dispatchEvent(new Event('resize'))
    })

    expect(getByTestId('FullNav')).not.toBeVisible()
    expect(getByTestId('CollapsedNav')).toBeVisible()
    expect(getByTestId('SideNav')).not.toBeVisible()
  })

  it('should open side nav when hamburger menu is clicked', async () => {
    setInnerWidth()
    const { getByTestId } = await render(NavBar)

    userEvent.click(getByTestId('HamburgerMenu'))

    expect(getByTestId('SideNav')).toBeVisible()
  })

  it('should open side nav when hamburger menu is clicked', async () => {
    setInnerWidth()
    const component = await render(NavBar)

    const { getByTestId } = component

    userEvent.click(getByTestId('HamburgerMenu'))

    expect(getByTestId('SideNav')).toBeVisible()

    userEvent.click(component.baseElement)

    expect(getByTestId('SideNav')).not.toBeVisible()
  })
})
