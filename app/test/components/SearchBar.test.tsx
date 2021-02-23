import { render } from '@testing-library/react'
import { SearchBar } from '../../src/components'

const renderComponent = () => render(<SearchBar />)

describe('<SearchBar />', () => {
  it('should render a search bar', () => {
    const { getByText } = renderComponent()

    expect(getByText('Search')).toBeVisible()
  })
})
