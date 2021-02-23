import React from 'react'
import E404 from '../../src/pages/404'
import { applyMockUseRouter, mockUseRouter } from '../testUtils'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

applyMockUseRouter()

const renderComponent = () => render(<E404 />)

describe('404 page test', () => {
  it('should render error page', () => {
    const { queryByText, queryByRole } = renderComponent()

    expect(queryByText('404 - Page Not Found')).toBeVisible()
    expect(queryByRole('button')).toBeVisible()
  })

  it('should redirect to / on button click', () => {
    const { queryByRole } = renderComponent()

    const button = queryByRole('button')
    userEvent.click(button as HTMLElement)

    expect(mockUseRouter.push).toHaveBeenCalledWith('/')
  })
})
