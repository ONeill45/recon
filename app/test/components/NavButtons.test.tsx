import { render, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { NavButtons } from 'components'
import { DisplayType } from 'interfaces'
import { applyMockUseRouter, mockUseRouter } from '../testUtils'

const buttonProperties = [
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
]
const displayType = DisplayType.ROW

applyMockUseRouter()

const renderComponent = async (
  buttonProperties: { title: string; route: string }[],
  displayType: DisplayType,
) => {
  const component = render(
    <NavButtons
      buttonProperties={buttonProperties}
      displayType={displayType}
    />,
  )
  await waitFor(() => Promise.resolve())
  return component
}

describe('<NavButtons />', () => {
  it('should render NavButtons in row', async () => {
    const component = await renderComponent(buttonProperties, displayType)

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
      buttonProperties,
      DisplayType.COLUMN,
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
    const { getByText } = await renderComponent(buttonProperties, displayType)

    userEvent.click(getByText('Clients'))

    expect(mockUseRouter.push).toHaveBeenCalledWith('/clients')
  })
})
