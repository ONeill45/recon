import userEvent from '@testing-library/user-event'

import E404 from 'pages/404'
import { applyMockUseRouter, mockUseRouter, render } from '../testUtils'

applyMockUseRouter()

describe('404 page test', () => {
  it('should render error page', async () => {
    const { getByText, getByRole } = await render(E404)

    expect(getByText('404 - Page Not Found')).toBeVisible()
    expect(getByRole('button')).toBeVisible()
  })

  it('should redirect to / on button click', async () => {
    const { getByRole } = await render(E404)

    const button = getByRole('button')
    userEvent.click(button)

    expect(mockUseRouter.push).toHaveBeenCalledWith('/')
  })
})
