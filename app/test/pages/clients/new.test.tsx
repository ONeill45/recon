import NewClient from 'pages/clients/new'
import { renderComponent } from '../../testUtils'

describe('New client page test', () => {
  it('should render new client page', async () => {
    const { getByRole } = await renderComponent(NewClient)

    expect(getByRole('button', { name: 'Submit' })).toBeVisible()
  })
})
