import { render, waitFor } from '@testing-library/react'
import faker from 'faker'

import { UserSelect } from 'components'

const mockAccount = {
  username: faker.internet.email(),
  name: `David ${faker.name.lastName()}`,
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

import { useMsAccount, useAccessToken } from 'utils/hooks'
jest.mock('utils/hooks/msal', () => ({
  useMsAccount: jest.fn(() => mockAccount),
  useAccessToken: jest.fn(() => mockAccessToken),
}))
const mockedUseMsAccount = useMsAccount as jest.MockedFunction<
  typeof useMsAccount
>
const mockedUseAccessToken = useAccessToken as jest.MockedFunction<
  typeof useAccessToken
>

jest.mock('utils/functions/msal', () => ({
  MsGraphEndpoints: { USER_THUMBNAIL: 'https://test.com' },
  callMsGraph: jest.fn().mockResolvedValue('http://localhost:3000/blah'),
}))

describe('<UserSelect />', () => {
  it('should not render UserSelectDiv if user is unauthenticated', async () => {
    mockedUseMsAccount.mockImplementationOnce(() => null)
    mockedUseAccessToken.mockImplementationOnce(() => undefined)

    const { queryByText } = render(<UserSelect />)
    await waitFor(() => Promise.resolve())
    expect(queryByText('Hi David')).toBeNull()
  })

  it('should render the UserSelectDiv if user is authenticated', async () => {
    const { queryByText } = render(<UserSelect />)
    await waitFor(() => Promise.resolve())
    expect(queryByText('Hi David')).not.toBeNull()
  })
})
