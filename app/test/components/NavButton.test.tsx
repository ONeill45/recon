import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { NavButton } from '../../src/components'
import { DisplayType } from '../../src/interfaces'
import { applyMockUseRouter, mockUseRouter } from '../testUtils'

const defaultTitle = 'Home'
const defaultRoute = '/home'

const fontColor = {
  selected: 'white',
  unselected: 'black',
}

applyMockUseRouter()

const renderComponent = (
  title: string = defaultTitle,
  route: string = defaultRoute,
) =>
  render(
    <NavButton title={title} route={route} displayType={DisplayType.ROW} />,
  )

describe('<NavButton />', () => {
  it('should render a selected NavButton', () => {
    const { getByText } = renderComponent()
    const homeButton = getByText('Home')

    expect(homeButton).toBeTruthy()

    const { color } = window.getComputedStyle(homeButton)
    expect(color).toEqual(fontColor.selected)
  })

  it('should render a unselected NavButton in row', () => {
    const { getByText } = renderComponent('Resources', '/resources')
    const resourceButton = getByText('Resources')

    expect(resourceButton).toBeTruthy()

    const { color } = window.getComputedStyle(resourceButton)
    expect(color).toEqual(fontColor.unselected)
  })

  it('should navigate to requested new page when clicked', () => {
    const { getByText } = renderComponent()
    const homeButton = getByText('Home')

    userEvent.click(homeButton)

    expect(mockUseRouter.push).toHaveBeenCalledTimes(1)
    expect(mockUseRouter.push).toHaveBeenCalledWith('/home')
  })
})
