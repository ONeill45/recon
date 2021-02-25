import NewClient from 'pages/clients/new'
import { render } from '../../testUtils'

describe('New client page test', () => {
  it('should render new client page', async () => {
    const { getByRole } = await render(NewClient, {}, null)

    expect(getByRole('button', { name: 'Submit' })).toBeVisible()
  })
})
