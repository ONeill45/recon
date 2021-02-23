import { SearchBar } from 'components'
import { render } from '../testUtils'

describe('<SearchBar />', () => {
  it('should render a search bar', async () => {
    const { getByText } = await render(SearchBar)

    expect(getByText('Search')).toBeVisible()
  })
})
