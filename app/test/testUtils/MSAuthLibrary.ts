import { MSAccountInfoFactory, MSAccessTokenFactory } from '../factories'
import faker from 'faker'

const mockMsAccountInfoMock = MSAccountInfoFactory.build()
const mockMsAccessTokenMock = MSAccessTokenFactory.build()

const mockMsInstance = {
  acquireTokenSilent: jest.fn().mockResolvedValue(mockMsAccessTokenMock),
  loginPopup: jest.fn(),
  logout: jest.fn(),
}

const mockUseMsalResponse = {
  instance: mockMsInstance,
  accounts: [mockMsAccountInfoMock],
}

const mockMsalHook = {
  useMsAccount: jest.fn(() => mockMsAccountInfoMock),
  useAccessToken: jest.fn(() => mockMsAccessTokenMock),
}

const mockMsalUrl = `${faker.internet.url()}/`
const mockMsalFunction = {
  MsGraphEndpoints: { USER_THUMBNAIL: 'https://test.com' },
  callMsGraph: jest.fn().mockResolvedValue(() => mockMsalUrl),
}

const applyMockUseMsal = () =>
  jest
    .spyOn(require('@azure/msal-react'), 'useMsal')
    .mockImplementation(() => mockUseMsalResponse)

export {
  mockMsAccountInfoMock,
  mockMsAccessTokenMock,
  mockMsInstance,
  mockUseMsalResponse,
  mockMsalHook,
  mockMsalFunction,
  mockMsalUrl,
  applyMockUseMsal,
}
