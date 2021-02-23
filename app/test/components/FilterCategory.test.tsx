import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { FilterCategory } from '../../src/components'

const renderComponent = () => render(<FilterCategory title="test" />)

describe('<FilterCategory />', () => {
  it('should not show expanded filter category content by default', () => {
    const { queryByTestId, getByText } = renderComponent()

    expect(queryByTestId('FilterCategoryContent')).toBeNull()
    expect(getByText('test')).toBeVisible()
  })

  it('should show expanded filter category content when header is clicked', () => {
    const { getByText, getByTestId } = renderComponent()

    userEvent.click(getByText('test'))

    expect(getByTestId('FilterCategoryContent')).toBeVisible()
  })
})
