import { SearchBar } from 'components'
import { renderComponent } from '../testUtils'

describe('<SearchBar />', () => {
  it('should render a search bar', async () => {
    const { getByText } = await renderComponent(SearchBar)

    expect(getByText('Search')).toBeVisible()
  })
})
