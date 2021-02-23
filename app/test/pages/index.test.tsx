import { render } from '@testing-library/react'
import Index from '../../src/pages/index'

describe('Index page test', () => {
  it('should render index page', () => {
    const { getByText } = render(<Index />)

    expect(getByText('Welcome to Recon!')).toBeVisible()
  })
})
