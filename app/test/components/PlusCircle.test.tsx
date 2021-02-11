import { fireEvent, render, screen } from '@testing-library/react'

import { PlusCircle } from 'components'

const useRouter = jest.spyOn(require('next/router'), 'useRouter')
const routerPush = jest.fn()
useRouter.mockImplementation(() => ({
  push: routerPush,
}))

const renderComponent = () => {
  return render(<PlusCircle size={'50'} route={'/test'} />)
}

describe('<PlusCircle />', () => {
  it('should log the user in on Log In button click', async () => {
    renderComponent()

    const plusCircle = screen.queryByTestId('PlusCircleDiv')
    if (plusCircle) fireEvent.click(plusCircle)

    expect(routerPush).toHaveBeenCalled()
  })
})
