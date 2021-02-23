import { render } from '@testing-library/react'
import { SearchBar } from '../../src/components'

const renderComponent = () => render(<SearchBar />)

describe('<SearchBar />', () => {
  it('should render a search bar', () => {
    const { queryByText } = renderComponent()

    expect(queryByText('Search')).toBeVisible()
  })
})
