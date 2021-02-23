import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { PlusCircle } from 'components'
import { applyMockUseRouter, mockUseRouter } from '../testUtils'

applyMockUseRouter()

const renderComponent = () => render(<PlusCircle size={'50'} route={'/test'} />)

describe('<PlusCircle />', () => {
  it('should render a plus circle button', async () => {
    const { getByTestId } = renderComponent()

    expect(getByTestId('PlusCircleDiv')).toBeVisible()
  })

  it('should route to new page when plus circle is clicked', async () => {
    const { getByTestId } = renderComponent()

    userEvent.click(getByTestId('PlusCircleDiv'))

    expect(mockUseRouter.push).toHaveBeenCalledWith('/test')
  })
})
