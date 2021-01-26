import React from 'react'
import { act } from 'react-dom/test-utils'
import { GiHamburgerMenu } from 'react-icons/gi'
import { mount, shallow } from 'enzyme'
import { matchers } from '@emotion/jest'

import {
  CollapsedNavDiv,
  FullNavDiv,
  NavBar,
  SideNavDiv,
} from '../../src/components'

expect.extend(matchers)

const renderWrapper = () => shallow(<NavBar />)

const useRouter = jest.spyOn(require('next/router'), 'useRouter')
const pushHandler = jest.fn()
useRouter.mockImplementation(() => ({
  pathname: '/home',
  push: pushHandler,
}))

describe('<NavBar />', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    })
  })

  it('should match snapshot', () => {
    const wrapper = renderWrapper()
    expect(wrapper).toMatchSnapshot()
  })

  it('should show the full nav bar by default', () => {
    const wrapper = mount(<NavBar />)

    expect(wrapper.exists()).toEqual(true)
    expect(wrapper.find(CollapsedNavDiv).prop('displayed')).toEqual(false)
    expect(wrapper.find(FullNavDiv).prop('displayed')).toEqual(true)
  })

  it('should show the collapsed nav when screen is too small for full nav', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 200,
    })
    const wrapper = mount(<NavBar />)

    expect(wrapper.exists()).toEqual(true)
    expect(wrapper.find(CollapsedNavDiv).prop('displayed')).toEqual(true)
    expect(wrapper.find(FullNavDiv).prop('displayed')).toEqual(false)
  })

  it('should collapse nav bar when screen is resized below threshold', () => {
    const wrapper = mount(<NavBar />)
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 200,
    })
    act(() => {
      global.dispatchEvent(new Event('resize'))
    })
    wrapper.update()

    expect(wrapper.exists()).toEqual(true)
    expect(wrapper.find(CollapsedNavDiv).prop('displayed')).toEqual(true)
    expect(wrapper.find(FullNavDiv).prop('displayed')).toEqual(false)
  })

  it('simulates click events', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 200,
    })
    const wrapper = mount(<NavBar />)
    wrapper.find(GiHamburgerMenu).simulate('click')

    expect(wrapper.find(SideNavDiv).prop('displayed')).toEqual(true)
  })

  it('should call useEffect cleanup function when component is unmounted', () => {
    const wrapper = mount(<NavBar />)

    wrapper.unmount()

    expect(wrapper.exists()).toEqual(false)
  })
})
