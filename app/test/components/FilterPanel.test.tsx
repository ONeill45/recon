import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { FilterPanel } from '../../src/components'

const renderComponent = () => render(<FilterPanel />)

describe('<FilterPanel />', () => {
  it('should not show expanded filter panel by default', () => {
    const { getByTestId } = renderComponent()

    expect(getByTestId('SideFilterPanel')).toBeVisible()
    expect(getByTestId('ExpandedFilterPanel')).not.toBeVisible()
  })

  it('should show expanded filter panel when side filter bar is clicked', () => {
    const { getByTestId } = renderComponent()

    userEvent.click(getByTestId('SideFilterPanel'))

    expect(getByTestId('ExpandedFilterPanel')).toBeVisible()
  })
})
