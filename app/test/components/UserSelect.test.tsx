import { fireEvent, render, waitFor } from '@testing-library/react'
import { useMsAccount, useAccessToken } from 'utils/hooks'

import { UserSelect } from 'components'
import {
  mockMsAccountInfoMock,
  mockMsAccessTokenMock,
  mockMsInstance,
  applyMockUseMsal,
  mockMsalUrl,
  mockUseRouter,
  applyMockUseRouter,
} from '../testUtils'

const { homeAccountId, name } = mockMsAccountInfoMock
const firstName = name?.split(' ')[0]

applyMockUseMsal()

applyMockUseRouter()

jest.mock('utils/hooks/msal', () => require('../testUtils').mockMsalHook)

jest.mock(
  'utils/functions/msal',
  () => require('../testUtils').mockMsalFunction,
)

const mockedUseMsAccount = useMsAccount as jest.MockedFunction<
  typeof useMsAccount
>
const mockedUseAccessToken = useAccessToken as jest.MockedFunction<
  typeof useAccessToken
>

const renderComponent = async () => {
  const component = render(<UserSelect />)
  await waitFor(() => Promise.resolve())
  return component
}

describe('<UserSelect />', () => {
  beforeEach(() => {
    mockedUseMsAccount.mockImplementation(() => mockMsAccountInfoMock)
    mockedUseAccessToken.mockImplementation(() => mockMsAccessTokenMock)
  })
  it('should not render UserSelectDiv if user is unauthenticated', async () => {
    mockedUseMsAccount.mockImplementation(() => null)
    mockedUseAccessToken.mockImplementation(() => undefined)

    const { queryByText, queryByRole } = await renderComponent()

    expect(queryByText(`Hi ${firstName}`)).toBeNull()
    expect(queryByRole('img')).toBeNull()
  })

  it('should render the greeting and show the user thumbnail if user is authenticated', async () => {
    const { queryByText, queryByRole, queryByTestId } = await renderComponent()

    const greetingDiv = queryByText(`Hi ${firstName}`)
    const thumbnailImg = queryByRole('img')

    expect(greetingDiv).not.toBeNull()
    expect(thumbnailImg).not.toBeNull()
    expect(thumbnailImg).toHaveProperty('src', mockMsalUrl)
    expect(queryByTestId('UserSelectMenu')).not.toBeVisible()
  })

  it('should show menu on thumbnail click', async () => {
    const { queryByRole, queryByTestId } = await renderComponent()

    const thumbnailImg = queryByRole('img')
    if (thumbnailImg) fireEvent.click(thumbnailImg)

    expect(thumbnailImg).not.toBeNull()
    expect(thumbnailImg).toHaveProperty('src', mockMsalUrl)
    expect(queryByTestId('UserSelectMenu')).toBeVisible()
  })

  it('should close the menu when the user clicks outside of it', async () => {
    const { queryByRole, queryByTestId } = await renderComponent()

    const thumbnailImg = queryByRole('img')
    if (thumbnailImg) fireEvent.click(thumbnailImg)
    expect(thumbnailImg).not.toBeNull()
    expect(thumbnailImg).toHaveProperty('src', mockMsalUrl)
    expect(queryByTestId('UserSelectMenu')).toBeVisible()

    fireEvent.mouseDown(document)
    expect(queryByTestId('UserSelectMenu')).not.toBeVisible()
  })

  it('should log the user out of their MS account if the user has no homeAccountId', async () => {
    mockedUseMsAccount.mockImplementation(() => ({
      ...mockMsAccountInfoMock,
      homeAccountId: '',
    }))

    const { queryByRole, getByRole, queryByTestId } = await renderComponent()

    const thumbnailImg = queryByRole('img')
    if (thumbnailImg) fireEvent.click(thumbnailImg)
    const logoutButton = getByRole('button', { name: 'Log Out' })
    if (logoutButton) fireEvent.click(logoutButton)
    expect(thumbnailImg).not.toBeNull()
    expect(thumbnailImg).toHaveProperty('src', mockMsalUrl)
    expect(queryByTestId('UserSelectMenu')).toBeVisible()
    expect(mockMsInstance.logout).toBeCalled()
  })

  it('should log out the user when logout is clicked in the menu', async () => {
    global.localStorage.setItem(`${homeAccountId}-blah`, 'blah')

    const { queryByRole, getByRole, queryByTestId } = await renderComponent()

    const thumbnailImg = queryByRole('img')
    if (thumbnailImg) fireEvent.click(thumbnailImg)
    const logoutButton = getByRole('button', { name: 'Log Out' })
    if (logoutButton) fireEvent.click(logoutButton)
    expect(thumbnailImg).not.toBeNull()
    expect(thumbnailImg).toHaveProperty('src', mockMsalUrl)
    expect(queryByTestId('UserSelectMenu')).toBeVisible()
    expect(mockUseRouter.reload).toBeCalled()
  })
})
