import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { FilterPanel } from '../../src/components'

const renderComponent = () => render(<FilterPanel />)

describe('<FilterPanel />', () => {
  it('should not show expanded filter panel by default', () => {
    const { queryByTestId } = renderComponent()

    expect(queryByTestId('SideFilterPanel')).toBeVisible()
    expect(queryByTestId('ExpandedFilterPanel')).not.toBeVisible()
  })

  it('should show expanded filter panel when side filter bar is clicked', () => {
    const { queryByTestId } = renderComponent()

    userEvent.click(queryByTestId('SideFilterPanel') as HTMLElement)

    expect(queryByTestId('ExpandedFilterPanel')).toBeVisible()
  })
})
