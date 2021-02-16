import faker from 'faker'
import { useMsAccount, useAccessToken } from 'utils/hooks'
import { AccountInfo } from '@azure/msal-browser'
import { MSAccountInfoFactory, MSAccessTokenFactory } from './factories'

// const firstName = faker.name.firstName()
// const homeAccountId = faker.random.alphaNumeric(20)

// const mockAccount = {
//   username: faker.internet.email(),
//   name: `${firstName} ${faker.name.lastName()}`,
//   homeAccountId: homeAccountId,
// }

// const mockAccessToken = faker.random.alphaNumeric(20)
// const mockUrl = `${faker.internet.url()}/`

// const useMsal = jest.spyOn(require('@azure/msal-react'), 'useMsal')
// const mockInstance = {
//   acquireTokenSilent: jest
//     .fn()
//     .mockResolvedValue({ accessToken: mockAccessToken }),
//   logout: jest.fn(),
// }
// useMsal.mockImplementation(() => ({
//   instance: mockInstance,
//   accounts: [mockAccount],
// }))
const msalHookMock = {
  useMsAccount: jest.fn(() => MSAccountInfoFactory.build()),
  useAccessToken: jest.fn(() => MSAccessTokenFactory.build()),
}
// jest.mock('utils/hooks/msal', () => ()
// const mockedUseMsAccount = useMsAccount as jest.MockedFunction<
//   typeof useMsAccount
// >
// const mockedUseAccessToken = useAccessToken as jest.MockedFunction<
//   typeof useAccessToken
// >

// jest.mock('utils/functions/msal', () => ({
//   MsGraphEndpoints: { USER_THUMBNAIL: 'https://test.com' },
//   callMsGraph: jest.fn().mockResolvedValue(() => mockUrl),
// }))

// export {
//   mockAccount,
//   mockAccessToken,
//   mockedUseMsAccount,
//   mockedUseAccessToken,
// }
export { msalHookMock }
