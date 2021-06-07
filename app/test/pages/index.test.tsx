import Index from 'pages/index'
import { render } from '../testUtils'

describe('Index page test', () => {
  it('should render index page', async () => {
    const { getByText } = await render(Index)

    expect(getByText('Welcome to Recon!')).toBeVisible()
  })
})
