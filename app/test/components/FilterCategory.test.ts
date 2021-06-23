import { waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { TestFilterCategory } from 'components'
import { render } from '../testUtils'

const title = 'test'
const data = {
  target: {
    name: 'title',
    checked: 'checked',
  },
  field: 'checkbox',
  name: 'software developer',
}

describe('<FilterCategory />', () => {
  it('should not show expanded filter category content by default', async () => {
    const { queryByTestId, getByText } = await render(TestFilterCategory, {
      title,
    })

    expect(queryByTestId('FilterCategoryContent')).not.toBeVisible()
    expect(getByText(title)).toBeVisible()
  })

  it('should show expanded filter category content when header is clicked', async () => {
    const { getByTestId, getByText, container } = await render(
      TestFilterCategory,
      {
        title,
      },
    )

    userEvent.click(getByText(title))

    waitFor(() => expect(getByTestId('FilterCategoryContent')).toBeVisible(), {
      container,
    })
  })
})
