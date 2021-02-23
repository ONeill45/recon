import userEvent from '@testing-library/user-event'

import { NavButtons } from 'components'
import { DisplayType } from 'interfaces'
import {
  applyMockUseRouter,
  mockUseRouter,
  renderComponent,
} from '../testUtils'

const defaultProps = {
  buttonProperties: [
    {
      title: 'Home',
      route: '/',
    },
    {
      title: 'Clients',
      route: '/clients',
    },
    {
      title: 'Projects',
      route: '/projects',
    },
    {
      title: 'Resources',
      route: '/resources',
    },
  ],
  displayType: DisplayType.ROW,
}

applyMockUseRouter()

describe('<NavButtons />', () => {
  it('should render NavButtons in row', async () => {
    const component = await renderComponent(NavButtons, defaultProps)

    const { getByText, getAllByRole } = component

    expect(getAllByRole('button').length).toEqual(4)
    expect(getByText('Home')).toBeTruthy()
    expect(getByText('Clients')).toBeTruthy()
    expect(getByText('Projects')).toBeTruthy()
    expect(getByText('Resources')).toBeTruthy()
    const { flexDirection } = window.getComputedStyle(
      component.container.firstElementChild as Element,
    )
    expect(flexDirection).toEqual('row')
  })

  it('should render NavButtons in column', async () => {
    const { getByText, getAllByRole, container } = await renderComponent(
      NavButtons,
      {
        ...defaultProps,
        displayType: DisplayType.COLUMN,
      },
    )

    expect(getAllByRole('button').length).toEqual(4)
    expect(getByText('Home')).toBeTruthy()
    expect(getByText('Clients')).toBeTruthy()
    expect(getByText('Projects')).toBeTruthy()
    expect(getByText('Resources')).toBeTruthy()
    const { flexDirection } = window.getComputedStyle(
      container.firstElementChild as Element,
    )
    expect(flexDirection).toEqual('column')
  })

  it('should navigate to route when button is clicked', async () => {
    const { getByText } = await renderComponent(NavButtons, defaultProps)

    userEvent.click(getByText('Clients'))

    expect(mockUseRouter.push).toHaveBeenCalledWith('/clients')
  })
})
