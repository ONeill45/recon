import Index from 'pages/index'
import { render } from '../testUtils'

jest.mock('utils/context/ThemeProvider', () => ({
  useTheme: jest.fn(() => {
    return { isDark: false }
  }),
}))

describe('Index page test', () => {
  it('should render index page', async () => {
    const { getByText } = await render(Index)

    expect(getByText('Welcome to Recon!')).toBeVisible()
  })
})
