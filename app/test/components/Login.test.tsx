import { fireEvent, render, screen } from '@testing-library/react'

import { Login } from 'components'

const useMsal = jest.spyOn(require('@azure/msal-react'), 'useMsal')
const mockInstance = {
  loginPopup: jest.fn(),
}
useMsal.mockImplementation(() => ({
  instance: mockInstance,
}))

const renderComponent = () => {
  return render(<Login />)
}

describe('<Login />', () => {
  it('should log the user in on Log In button click', async () => {
    renderComponent()

    const loginButton = screen.getByRole('button', { name: 'Log In' })
    if (loginButton) fireEvent.click(loginButton)

    expect(mockInstance.loginPopup).toHaveBeenCalled()
  })

  it('should log an error if the user is not logged in on click', async () => {
    jest.spyOn(console, 'error').mockImplementation(() => {})
    const mockInstanceError = {
      loginPopup: jest.fn(() => {
        throw new Error('An error occurred')
      }),
    }
    useMsal.mockImplementation(() => ({
      instance: mockInstanceError,
    }))
    renderComponent()

    const loginButton = screen.getByRole('button', { name: 'Log In' })
    if (loginButton) fireEvent.click(loginButton)

    expect(mockInstanceError.loginPopup).toHaveBeenCalled()
  })
})
