import userEvent from '@testing-library/user-event'

import { FilterPanel } from 'components'
import { render } from '../testUtils'

describe('<FilterPanel />', () => {
  it('should not show expanded filter panel by default', async () => {
    const { getByTestId } = await render(FilterPanel)

    expect(getByTestId('SideFilterPanel')).toBeVisible()
    expect(getByTestId('ExpandedFilterPanel')).not.toBeVisible()
  })

  it('should show expanded filter panel when side filter bar is clicked', async () => {
    const { getByTestId } = await render(FilterPanel)

    userEvent.click(getByTestId('SideFilterPanel'))

    expect(getByTestId('ExpandedFilterPanel')).toBeVisible()
  })
})
