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
  render,
} from '../testUtils'
import { waitFor } from '@testing-library/react'

const { homeAccountId } = mockMsAccountInfoMock

applyMockUseMsal()

applyMockUseRouter()

// eslint-disable-next-line @typescript-eslint/no-var-requires
jest.mock('utils/hooks/msal', () => require('../testUtils').mockMsalHook)

jest.mock(
  'utils/functions/msal',
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  () => require('../testUtils').mockMsalFunction,
)

const mockedUseMsAccount = useMsAccount as jest.MockedFunction<
  typeof useMsAccount
>
const mockedUseAccessToken = useAccessToken as jest.MockedFunction<
  typeof useAccessToken
>

describe('<UserSelect />', () => {
  beforeEach(() => {
    mockedUseMsAccount.mockImplementation(() => mockMsAccountInfoMock)
    mockedUseAccessToken.mockImplementation(() => mockMsAccessTokenMock)
  })
  it('should not render UserSelectDiv if user is unauthenticated', async () => {
    mockedUseMsAccount.mockImplementation(() => null)
    mockedUseAccessToken.mockImplementation(() => undefined)

    const { queryByTestId } = await render(UserSelect)

    expect(queryByTestId('UserSelectMenuButton')).toBeNull()
  })

  it('should render the greeting and show the user thumbnail if user is authenticated', async () => {
    const { getByTestId } = await render(UserSelect)
    const button = getByTestId('UserSelectMenuButton')
    const avatar = getByTestId('UserSelectAvatar')

    expect(button).toBeVisible()
    expect(avatar).toHaveProperty('src', mockMsalUrl)
    expect(getByTestId('UserSelectMenu')).not.toBeVisible()
  })

  it('should show menu on thumbnail click', async () => {
    const { getByTestId, container } = await render(UserSelect)

    const button = getByTestId('UserSelectMenuButton')
    const avatar = getByTestId('UserSelectAvatar')

    expect(button).toBeVisible()
    expect(avatar).toHaveProperty('src', mockMsalUrl)

    userEvent.click(button)

    await waitFor(() => expect(getByTestId('UserSelectMenu')).toBeVisible(), {
      container: container,
    })
  })

  it('should close the menu when the user clicks outside of it', async () => {
    const { getByTestId, container } = await render(UserSelect)

    const button = getByTestId('UserSelectMenuButton')
    const avatar = getByTestId('UserSelectAvatar')

    userEvent.click(button)

    expect(button).toBeVisible()
    expect(avatar).toHaveProperty('src', mockMsalUrl)
    await waitFor(() => expect(getByTestId('UserSelectMenu')).toBeVisible(), {
      container: container,
    })

    userEvent.click(container)

    expect(getByTestId('UserSelectMenu')).not.toBeVisible()
  })

  it('should log the user out of their MS account if the user has no homeAccountId', async () => {
    mockedUseMsAccount.mockImplementation(() => ({
      ...mockMsAccountInfoMock,
      homeAccountId: '',
    }))

    const { getByTestId } = await render(UserSelect)

    const button = getByTestId('UserSelectMenuButton')
    const avatar = getByTestId('UserSelectAvatar')

    userEvent.click(button)
    userEvent.click(getByTestId('LogOutMenuItem'))

    expect(button).toBeVisible()
    expect(avatar).toHaveProperty('src', mockMsalUrl)
    expect(mockMsInstance.logout).toBeCalled()
  })

  it('should log out the user when logout is clicked in the menu', async () => {
    global.localStorage.setItem(`${homeAccountId}-blah`, 'blah')

    const { getByTestId } = await render(UserSelect)

    const button = getByTestId('UserSelectMenuButton')
    const avatar = getByTestId('UserSelectAvatar')

    userEvent.click(button)
    userEvent.click(getByTestId('LogOutMenuItem'))

    expect(button).toBeVisible()
    expect(avatar).toHaveProperty('src', mockMsalUrl)
    expect(mockUseRouter.reload).toBeCalled()
  })
})
