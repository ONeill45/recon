import { mount, shallow } from 'enzyme'
import { matchers } from '@emotion/jest'
import { CollapsedNavDiv, FullNavDiv, NavBar } from '../../src/components'
import React from 'react'

expect.extend(matchers)

const renderWrapper = () => shallow(<NavBar />)

const useRouter = jest.spyOn(require('next/router'), 'useRouter')
const pushHandler = jest.fn()
useRouter.mockImplementation(() => ({
  pathname: '/home',
  push: pushHandler,
}))

describe('<NavBar />', () => {
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
    global.dispatchEvent(new Event('resize'))
    const wrapper = mount(<NavBar />)

    expect(wrapper.exists()).toEqual(true)
    expect(wrapper.find(CollapsedNavDiv).prop('displayed')).toEqual(true)
    expect(wrapper.find(FullNavDiv).prop('displayed')).toEqual(false)
  })

  // it('setOpenIndex sets the open index state properly', () => {
  //   const wrapper = shallow(<NavBar />)
  //   expect(wrapper.state('collapsed')).toBe(false)
  // })

  // it('should render itself', () => {
  //   reactMock.useState = setHookState({
  //     collapsed: true,
  //     displaySideMenu: true,
  //   })
  //   const wrapper = shallow(<NavBar />)
  //   expect(wrapper.exists()).toEqual(true)
  //   expect(wrapper.find(CollapsedNavDiv).prop('displayed')).toEqual(true)
  //   expect(wrapper.prop('children')).toEqual('blah')
  // })
})
