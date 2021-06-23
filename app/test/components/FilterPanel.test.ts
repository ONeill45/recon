import { waitFor } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'

import { FilterPanel } from 'components'
import { render } from '../testUtils'

describe('<FilterPanel />', () => {
  it('should not show expanded filter panel by default', async () => {
    const { queryByTestId } = await render(FilterPanel)

    expect(queryByTestId('FilterPanelButton')).toBeVisible()
    expect(queryByTestId('FilterPanelDrawer')).not.toBeInTheDocument()
  })

  it('should show expanded filter panel when side filter bar is clicked', async () => {
    const { queryByTestId, getByTestId, container } = await render(FilterPanel)

    userEvent.click(getByTestId('FilterPanelButton'))

    waitFor(
      () => expect(queryByTestId('FilterPanelDrawer')).toBeInTheDocument(),
      {
        container,
      },
    )
  })
})
