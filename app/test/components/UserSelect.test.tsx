import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import faker from 'faker'
import { useMsAccount, useAccessToken } from 'utils/hooks'
import { AccountInfo } from '@azure/msal-browser'

import { UserSelect } from 'components'

const firstName = faker.name.firstName()

const mockAccount = {
  username: faker.internet.email(),
  name: `${firstName} ${faker.name.lastName()}`,
  homeAccountId: faker.random.alphaNumeric(20),
}

const mockAccessToken = faker.random.alphaNumeric(20)
const mockUrl = `${faker.internet.url()}/`

const useMsal = jest.spyOn(require('@azure/msal-react'), 'useMsal')
const mockInstance = {
  acquireTokenSilent: jest
    .fn()
    .mockResolvedValue({ accessToken: mockAccessToken }),
  logout: jest.fn(),
}
useMsal.mockImplementation(() => ({
  instance: mockInstance,
  accounts: [mockAccount],
}))

jest.mock('utils/hooks/msal', () => ({
  useMsAccount: jest.fn(() => mockAccount as AccountInfo),
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
  callMsGraph: jest.fn().mockResolvedValue(() => mockUrl),
}))

const useRouter = jest.spyOn(require('next/router'), 'useRouter')
const routerReload = jest.fn()
useRouter.mockImplementation(() => ({
  reload: routerReload,
}))

const renderComponent = async () => {
  render(<UserSelect />)
  await waitFor(() => Promise.resolve())
}

describe('<UserSelect />', () => {
  it('should not render UserSelectDiv if user is unauthenticated', async () => {
    mockedUseMsAccount.mockImplementationOnce(() => null)
    mockedUseAccessToken.mockImplementationOnce(() => undefined)

    await renderComponent()

    expect(screen.queryByText(`Hi ${firstName}`)).toBeNull()
    expect(screen.queryByRole('img')).toBeNull()
  })

  it('should render the greeting and show the user thumbnail if user is authenticated', async () => {
    await renderComponent()

    const greetingDiv = screen.queryByText(`Hi ${firstName}`)
    const thumbnailImg = screen.queryByRole('img')

    expect(greetingDiv).not.toBeNull()
    expect(thumbnailImg).not.toBeNull()
    expect(thumbnailImg).toHaveProperty('src', mockUrl)
    expect(screen.queryByTestId('UserSelectMenu')).not.toBeVisible()
  })

  it('should show menu on thumbnail click', async () => {
    await renderComponent()

    const thumbnailImg = screen.queryByRole('img')
    if (thumbnailImg) fireEvent.click(thumbnailImg)

    expect(thumbnailImg).not.toBeNull()
    expect(thumbnailImg).toHaveProperty('src', mockUrl)
    expect(screen.queryByTestId('UserSelectMenu')).toBeVisible()
  })

  it('should log out the user when logout is clicked in the menu', async () => {
    await renderComponent()

    const thumbnailImg = screen.queryByRole('img')
    if (thumbnailImg) fireEvent.click(thumbnailImg)
    const logoutButton = screen.getByRole('button', { name: 'Log Out' })
    if (logoutButton) fireEvent.click(logoutButton)
    expect(thumbnailImg).not.toBeNull()
    expect(thumbnailImg).toHaveProperty('src', mockUrl)
    expect(screen.queryByTestId('UserSelectMenu')).toBeVisible()
    expect(routerReload).toBeCalled()
  })

  it('should log out of thier MS account if the user has no homeAccountId', async () => {
    mockedUseMsAccount.mockImplementationOnce(() => null)

    await renderComponent()

    const thumbnailImg = screen.queryByRole('img')
    if (thumbnailImg) fireEvent.click(thumbnailImg)
    const logoutButton = screen.getByRole('button', { name: 'Log Out' })
    if (logoutButton) fireEvent.click(logoutButton)
    expect(thumbnailImg).not.toBeNull()
    expect(thumbnailImg).toHaveProperty('src', mockUrl)
    expect(screen.queryByTestId('UserSelectMenu')).toBeVisible()
    expect(routerReload).not.toBeCalled()
    expect(mockInstance.logout).toBeCalled()
  })
})
