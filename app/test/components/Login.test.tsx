import userEvent from '@testing-library/user-event'

import { Login } from 'components'
import { mockMsInstance, applyMockUseMsal, renderComponent } from '../testUtils'

applyMockUseMsal()

describe('<Login />', () => {
  it('should log the user in on Log In button click', async () => {
    const { getByRole } = await renderComponent(Login)

    userEvent.click(getByRole('button', { name: 'Log In' }))

    expect(mockMsInstance.loginPopup).toHaveBeenCalledWith({
      prompt: 'select_account',
      scopes: ['User.Read'],
    })
  })

  it('should log an error if the user is not logged in on click', async () => {
    /* eslint-disable no-console */
    console.error = jest.fn()
    mockMsInstance.loginPopup = jest.fn(() => {
      throw new Error('An error occurred')
    })
    const { getByRole } = await renderComponent(Login)
    userEvent.click(getByRole('button', { name: 'Log In' }))
    expect(mockMsInstance.loginPopup).toBeCalled()

    await new Promise((resolve) => setTimeout(resolve, 0))
    expect(console.error).toHaveBeenCalledWith(new Error('An error occurred'))
    /* eslint-enable no-console */
  })
})
