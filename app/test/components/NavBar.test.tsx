import React from 'react'
import { act } from 'react-dom/test-utils'
import { render, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { applyMockUseRouter } from '../testUtils'
import { NavBar } from '../../src/components'

applyMockUseRouter()

const renderComponent = async () => {
  const component = render(<NavBar />)
  await waitFor(() => Promise.resolve())
  return component
}

const setInnerWidth = (width: number = 200) => {
  Object.defineProperty(window, 'innerWidth', {
    writable: true,
    configurable: true,
    value: width,
  })
}

describe('<NavBar />', () => {
  beforeEach(() => {
    setInnerWidth(1024)
  })

  it('should show the full nav bar by default', async () => {
    const { getByTestId } = await renderComponent()

    expect(getByTestId('FullNav')).toBeVisible()
    expect(getByTestId('CollapsedNav')).not.toBeVisible()
    expect(getByTestId('SideNav')).not.toBeVisible()
  })

  it('should show the collapsed nav when screen is too small for full nav', async () => {
    setInnerWidth()
    const { getByTestId } = await renderComponent()

    expect(getByTestId('FullNav')).not.toBeVisible()
    expect(getByTestId('CollapsedNav')).toBeVisible()
    expect(getByTestId('SideNav')).not.toBeVisible()
  })

  it('should collapse nav bar when screen is resized below threshold', async () => {
    const { getByTestId } = await renderComponent()
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
    const { getByTestId } = await renderComponent()

    userEvent.click(getByTestId('HamburgerMenu'))

    expect(getByTestId('SideNav')).toBeVisible()
  })

  it('should open side nav when hamburger menu is clicked', async () => {
    setInnerWidth()
    const component = await renderComponent()

    const { getByTestId } = component

    userEvent.click(getByTestId('HamburgerMenu'))

    expect(getByTestId('SideNav')).toBeVisible()

    userEvent.click(component.baseElement)

    expect(getByTestId('SideNav')).not.toBeVisible()
  })
})
