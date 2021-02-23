import userEvent from '@testing-library/user-event'

import { PlusCircle } from 'components'
import {
  applyMockUseRouter,
  mockUseRouter,
  renderComponent,
} from '../testUtils'

applyMockUseRouter()

const defaultProps = {
  size: '50',
  route: '/test',
}

describe('<PlusCircle />', () => {
  it('should render a plus circle button', async () => {
    const { getByTestId } = await renderComponent(PlusCircle, defaultProps)

    expect(getByTestId('PlusCircleDiv')).toBeVisible()
  })

  it('should route to new page when plus circle is clicked', async () => {
    const { getByTestId } = await renderComponent(PlusCircle, defaultProps)

    userEvent.click(getByTestId('PlusCircleDiv'))

    expect(mockUseRouter.push).toHaveBeenCalledWith('/test')
  })
})
