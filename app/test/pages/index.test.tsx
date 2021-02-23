import { render } from '@testing-library/react'
import Index from '../../src/pages/index'

describe('Index page test', () => {
  it('should render index page', () => {
    const { queryByText } = render(<Index />)

    expect(queryByText('Welcome to Recon!')).toBeVisible()
  })
})
