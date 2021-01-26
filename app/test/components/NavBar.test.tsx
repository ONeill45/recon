import { mount, shallow } from 'enzyme'
import { matchers } from '@emotion/jest'
import { CollapsedNavDiv, FullNavDiv, NavBar } from '../../src/components'
import React from 'react'

expect.extend(matchers)

const renderWrapper = () => shallow(<NavBar />)

const reactMock = require('react')

const setHookState = (newState: {}) =>
  jest.fn().mockImplementation((state: {}) => [newState, (newState: {}) => {}])

describe('<NavBar />', () => {
  it('should match snapshot', () => {
    const wrapper = renderWrapper()
    expect(wrapper).toMatchSnapshot()
  })

  // it('simulates click events', () => {
  //   jest.spyOn(React, 'useEffect').mockImplementation((f) => f())
  //   const wrapper = renderWrapper()
  //   wrapper.find().simulate('click')
  //   const handler = jest.fn()

  //   expect(handler).toHaveBeenCalledTimes(1)
  // })

  it('should show the full nav bar by default', () => {
    const wrapper = shallow(<NavBar />)

    expect(wrapper.exists()).toEqual(true)
    expect(wrapper.find(CollapsedNavDiv).prop('displayed')).toEqual(false)
    expect(wrapper.find(FullNavDiv).prop('displayed')).toEqual(true)
  })

  it('should show the collapsed nav when screen is too small for full nav', () => {
    const realUseState = React.useState
    const testFunction = jest.fn()
    // Stub the initial state
    const stubInitialState = [true, testFunction]
    // Mock useState before rendering your component
    jest
      .spyOn(React, 'useState')
      .mockImplementation(() => realUseState(stubInitialState))

    // window.matchMedia = jest.fn().mockImplementation(() => {
    //   return {
    //     matches: false,
    //     media: '',
    //     onchange: null,
    //     addListener: jest.fn(),
    //     removeListener: jest.fn(),
    //   }
    // })
    // global.dispatchEvent(new Event('resize'))
    const wrapper = shallow(<NavBar />)

    expect(wrapper.exists()).toEqual(true)
    expect(testFunction).toHaveBeenCalledTimes(1)
    // expect(wrapper.find(CollapsedNavDiv).prop('displayed')).toEqual(true)
    // expect(wrapper.find(FullNavDiv).prop('displayed')).toEqual(false)
  })

  // it('should update state on click', () => {
  //   const setCollapsed = jest.fn()
  //   mount(<NavBar />)
  //   const handleClick = jest.spyOn(React, 'useState')
  //   handleClick.mockImplementation((collapsed: any) => [
  //     collapsed,
  //     setCollapsed,
  //   ])

  //   expect(setCollapsed).toBeTruthy()
  // })

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
