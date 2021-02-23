import { render, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

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
    const { getByText, getByRole, getByTestId } = await renderComponent()

    const greetingDiv = getByText(`Hi ${firstName}`)
    const thumbnailImg = getByRole('img')

    expect(greetingDiv).toBeVisible()
    expect(thumbnailImg).toBeVisible()
    expect(thumbnailImg).toHaveProperty('src', mockMsalUrl)
    expect(getByTestId('UserSelectMenu')).not.toBeVisible()
  })

  it('should show menu on thumbnail click', async () => {
    const { getByRole, getByTestId } = await renderComponent()

    const thumbnailImg = getByRole('img')
    userEvent.click(thumbnailImg)

    expect(thumbnailImg).toBeVisible()
    expect(thumbnailImg).toHaveProperty('src', mockMsalUrl)
    expect(getByTestId('UserSelectMenu')).toBeVisible()
  })

  it('should close the menu when the user clicks outside of it', async () => {
    const { getByRole, getByTestId, getByText } = await renderComponent()

    const thumbnailImg = getByRole('img')
    userEvent.click(thumbnailImg)
    expect(thumbnailImg).toBeVisible()
    expect(thumbnailImg).toHaveProperty('src', mockMsalUrl)
    expect(getByTestId('UserSelectMenu')).toBeVisible()

    userEvent.click(getByText(`Hi ${firstName}`))
    expect(getByTestId('UserSelectMenu')).not.toBeVisible()
  })

  it('should log the user out of their MS account if the user has no homeAccountId', async () => {
    mockedUseMsAccount.mockImplementation(() => ({
      ...mockMsAccountInfoMock,
      homeAccountId: '',
    }))

    const { getByRole, getByTestId } = await renderComponent()

    const thumbnailImg = getByRole('img')
    userEvent.click(thumbnailImg)
    userEvent.click(getByRole('button', { name: 'Log Out' }))
    expect(thumbnailImg).toBeVisible()
    expect(thumbnailImg).toHaveProperty('src', mockMsalUrl)
    expect(getByTestId('UserSelectMenu')).toBeVisible()
    expect(mockMsInstance.logout).toBeCalled()
  })

  it('should log out the user when logout is clicked in the menu', async () => {
    global.localStorage.setItem(`${homeAccountId}-blah`, 'blah')

    const { getByRole, getByTestId } = await renderComponent()

    const thumbnailImg = getByRole('img')
    userEvent.click(thumbnailImg)
    userEvent.click(getByRole('button', { name: 'Log Out' }))
    expect(thumbnailImg).toBeVisible()
    expect(thumbnailImg).toHaveProperty('src', mockMsalUrl)
    expect(getByTestId('UserSelectMenu')).toBeVisible()
    expect(mockUseRouter.reload).toBeCalled()
  })
})
