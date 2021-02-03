import { renderHook } from '@testing-library/react-hooks/server'
import faker from 'faker'
import { useAccount, useMsal } from '@azure/msal-react'

import { useAccessToken, useMsAccount } from 'utils/hooks'

const mockAccount = {
    username: faker.internet.email(),
    name: `${faker.name.lastName()}} ${faker.name.lastName()}`,
    homeAccountId: faker.random.alphaNumeric(20),
  },
  mockAccounts = [mockAccount],
  mockAccessToken = faker.random.alphaNumeric(20)

jest.mock('@azure/msal-react', () => ({
  useAccount: jest.fn(() => mockAccount),
  useMsal: jest.fn(() => ({
    accounts: mockAccounts,
    instance: {
      acquireTokenSilent: jest
        .fn()
        .mockResolvedValue({ accessToken: mockAccessToken }),
    },
  })),
}))
const mockedUseAccount = useAccount as jest.MockedFunction<typeof useAccount>
const mockedUseMsal = useMsal as jest.MockedFunction<typeof useMsal>

describe('useMsAccount', () => {
  it('should return the AccountInfo for a logged in user', () => {
    const account = useMsAccount()
    expect(mockedUseMsal).toBeCalled()
    expect(mockedUseAccount).toBeCalledWith(mockAccounts[0])
    expect(account).toEqual(mockAccount)
  })
})

describe('useAccessToken', () => {
  it('should return an access token for an authenticated user on render', async () => {
    const { hydrate, result, waitForValueToChange } = renderHook(() =>
      useAccessToken(),
    )

    hydrate()
    await waitForValueToChange(() => result.current)

    expect(result.current).toEqual(mockAccessToken)
  })
})
