import Index from 'pages/index'
import { renderComponent } from '../testUtils'

describe('Index page test', () => {
  it('should render index page', async () => {
    const { getByText } = await renderComponent(Index)

    expect(getByText('Welcome to Recon!')).toBeVisible()
  })
})
