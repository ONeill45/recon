import userEvent from '@testing-library/user-event'

import { NavButton } from 'components'
import { DisplayType } from 'interfaces'
import { applyMockUseRouter, mockUseRouter, render } from '../testUtils'

const defaultProps = {
  title: 'Home',
  route: '/home',
  displayType: DisplayType.ROW,
}

const fontColor = {
  selected: 'white',
  unselected: 'black',
}

applyMockUseRouter()

describe('<NavButton />', () => {
  it('should render a selected NavButton', async () => {
    const { getByText } = await render(NavButton, defaultProps)
    const homeButton = getByText('Home')

    expect(homeButton).toBeTruthy()

    const { color } = window.getComputedStyle(homeButton)
    expect(color).toEqual(fontColor.selected)
  })

  it('should render a unselected NavButton in row', async () => {
    const { getByText } = await render(NavButton, {
      ...defaultProps,
      title: 'Resources',
      route: '/resources',
    })
    const resourceButton = getByText('Resources')

    expect(resourceButton).toBeTruthy()

    const { color } = window.getComputedStyle(resourceButton)
    expect(color).toEqual(fontColor.unselected)
  })

  it('should navigate to requested new page when clicked', async () => {
    const { getByText } = await render(NavButton, defaultProps)
    const homeButton = getByText('Home')

    userEvent.click(homeButton)

    expect(mockUseRouter.push).toHaveBeenCalledTimes(1)
    expect(mockUseRouter.push).toHaveBeenCalledWith('/home')
  })
})
