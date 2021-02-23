import userEvent from '@testing-library/user-event'

import { FilterCategory } from 'components'
import { render } from '../testUtils'

const title = 'test'

describe('<FilterCategory />', () => {
  it('should not show expanded filter category content by default', async () => {
    const { queryByTestId, getByText } = await render(FilterCategory, {
      title,
    })

    expect(queryByTestId('FilterCategoryContent')).toBeNull()
    expect(getByText(title)).toBeVisible()
  })

  it('should show expanded filter category content when header is clicked', async () => {
    const { getByTestId, getByText } = await render(FilterCategory, {
      title,
    })

    userEvent.click(getByText(title))

    expect(getByTestId('FilterCategoryContent')).toBeVisible()
  })
})
