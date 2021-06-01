import { SearchBar } from 'components'
import { render } from '../testUtils'

describe('<SearchBar />', () => {
  it('should render a search bar', async () => {
    const { queryByPlaceholderText } = await render(SearchBar)

    expect(queryByPlaceholderText('Search...')).toBeVisible()
  })
})
