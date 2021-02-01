import { mount } from 'enzyme'
// import { matchers } from '@emotion/jest'
import faker from 'faker'

import { UserSelect } from 'components'

// expect.extend(matchers)

const mockAccount = {
  username: faker.internet.email(),
  name: `${faker.name.firstName()} ${faker.name.lastName()}`,
}

const mockAccessToken = faker.random.alphaNumeric(20)

const useMsal = jest.spyOn(require('@azure/msal-react'), 'useMsal')
useMsal.mockImplementation(() => ({
  instance: {
    acquireTokenSilent: jest
      .fn()
      .mockResolvedValue({ accessToken: mockAccessToken }),
  },
  accounts: [mockAccount],
}))

jest.mock('utils/hooks/msal', () => ({
  useMsAccount: jest.fn(() => mockAccount),
  useAccessToken: jest.fn(() => mockAccessToken),
}))

jest.mock('utils/functions/msal', () => ({
  callMsGraph: jest.fn().mockResolvedValue('http://localhost:3000/blah'),
}))

const renderComponent = () => mount(<UserSelect />)

describe('<UserSelect />', () => {
  it('should not render UserSelectDiv before pulling user thumbnail', () => {
    const component = renderComponent()
    console.log(component.debug())
    expect(component.find('UserSelectDiv').length).toBe(0)
  })

  it('should render UserSelectDiv after pulling user thumbnail', () => {
    const component = renderComponent()
    console.log(component.debug())
    expect(component.find('UserSelectDiv').length).toBe(1)
  })

  // it('should render SideNavDiv on UserSelectDiv click', () => {

  // })
})
