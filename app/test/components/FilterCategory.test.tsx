import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { FilterCategory } from '../../src/components'

const renderComponent = () => render(<FilterCategory title="test" />)

describe('<FilterCategory />', () => {
  it('should not show expanded filter category content by default', () => {
    const { queryByTestId } = renderComponent()

    expect(queryByTestId('FilterCategoryContent')).toBeNull()
  })

  it('should show expanded filter category content when header is clicked', () => {
    const { queryByText, queryByTestId } = renderComponent()

    const header = queryByText('test')
    expect(header).not.toBeNull()

    userEvent.click(header as HTMLElement)

    expect(queryByTestId('FilterCategoryContent')).toBeVisible()
  })
})
