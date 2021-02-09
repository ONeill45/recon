import React from 'react'
import { mount } from 'enzyme'
import Clients from '../../src/pages/clients'
import axios from 'axios'
import { ClientFactory } from '../factories'
import { ClientCards } from '../../src/components'
import { act } from 'react-dom/test-utils'
import { MockedProvider } from '@apollo/client/testing'

describe('Client page test', () => {
  it('matches snapshot', () => {
    const wrapper = mount(
      <MockedProvider>
        <Clients />
      </MockedProvider>,
    )
    expect(wrapper).toMatchSnapshot()
  })

  //   it('matches snapshot', async () => {
  //     const clients = ClientFactory.buildList(5)

  //     axios.post = jest.fn().mockResolvedValue({
  //       data: {
  //         data: {
  //           clients,
  //         },
  //       },
  //     })
  //     const wrapper = mount(<Clients />)
  //     act(() => {
  //       wrapper.update()
  //     })

  //     expect(axios.post).toHaveBeenCalledWith('http://localhost:5000', {
  //       query: `
  //   {
  //     clients {
  //       id
  //       clientName
  //       description
  //       logoUrl
  //       startDate
  //       endDate
  //     }
  //   }
  // `,
  //     })

  //     await act(() => Promise.resolve())

  //     expect(wrapper.find(ClientCards).length).toEqual(1)
  //   })
})
