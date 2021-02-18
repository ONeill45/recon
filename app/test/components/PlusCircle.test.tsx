import { fireEvent, getByTestId, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { PlusCircle } from 'components'

const useRouter = jest.spyOn(require('next/router'), 'useRouter')
const routerPush = jest.fn()
useRouter.mockImplementation(() => ({
  push: routerPush,
}))

const renderComponent = () => render(<PlusCircle size={'50'} route={'/test'} />)

describe('<PlusCircle />', () => {
  it('should route to new page when plus circle is clicked', async () => {
    const { queryByTestId } = renderComponent()

    userEvent.click(queryByTestId('PlusCircleDiv') as HTMLElement)

    expect(routerPush).toHaveBeenCalled()
  })
})
