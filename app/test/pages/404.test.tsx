import React from 'react'
import E404 from '../../src/pages/404'
import { applyMockUseRouter, mockUseRouter } from '../testUtils'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

applyMockUseRouter()

const renderComponent = () => render(<E404 />)

describe('404 page test', () => {
  it('should render error page', () => {
    const { getByText, getByRole } = renderComponent()

    expect(getByText('404 - Page Not Found')).toBeVisible()
    expect(getByRole('button')).toBeVisible()
  })

  it('should redirect to / on button click', () => {
    const { getByRole } = renderComponent()

    const button = getByRole('button')
    userEvent.click(button)

    expect(mockUseRouter.push).toHaveBeenCalledWith('/')
  })
})
