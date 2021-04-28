import React from 'react'
import Index from 'pages/index'
// import { render } from '../testUtils'
import { render } from '@testing-library/react'
import { ThemeContext } from '@emotion/react'

jest.mock('utils/context/ThemeProvider', () => ({
  __esModule: true,
  default: React.createContext<any | undefined>(undefined),
}))

describe('Index page test', () => {
  it('should render index page', async () => {
    const { getByText } = render(
      <ThemeContext.Provider value={}>
        <Index />
      </ThemeContext.Provider>,
    )

    expect(getByText('Welcome to Recon!')).toBeVisible()
  })
})
