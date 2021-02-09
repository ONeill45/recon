import React from 'react'
import { shallow } from 'enzyme'
import E404 from '../../src/pages/404'
import { Button } from '../../src/components'

const useRouter = jest.spyOn(require('next/router'), 'useRouter')
const pushHandler = jest.fn()
useRouter.mockImplementation(() => ({
  pathname: '/',
  push: pushHandler,
}))

describe('404 page test', () => {
  it('matches snapshot', () => {
    const wrapper = shallow(<E404 />)
    expect(wrapper).toMatchSnapshot()
  })

  it('simulates click events', () => {
    const wrapper = shallow(<E404 />).find(Button).simulate('click')
    wrapper.simulate('click')
     expect(pushHandler).toHaveBeenCalledWith('/')
  })
})
