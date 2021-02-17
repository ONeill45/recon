import { render, waitFor } from '@testing-library/react'
import { NavButtons } from 'components'
import { DisplayType } from 'interfaces'

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

jest
  .spyOn(require('next/router'), 'useRouter')
  .mockImplementation(() => require('../testUtils').mockUseRouter)

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

    const { queryByText, getAllByRole } = component

    expect(getAllByRole('button').length).toEqual(4)
    expect(queryByText('Home')).toBeTruthy()
    expect(queryByText('Clients')).toBeTruthy()
    expect(queryByText('Projects')).toBeTruthy()
    expect(queryByText('Resources')).toBeTruthy()
    const { flexDirection } = window.getComputedStyle(
      component.container.firstElementChild as Element,
    )
    expect(flexDirection).toEqual('row')
  })

  it('should render NavButtons in column', async () => {
    const { queryByText, getAllByRole, container } = await renderComponent(
      buttonProperties,
      DisplayType.COLUMN,
    )

    expect(getAllByRole('button').length).toEqual(4)
    expect(queryByText('Home')).toBeTruthy()
    expect(queryByText('Clients')).toBeTruthy()
    expect(queryByText('Projects')).toBeTruthy()
    expect(queryByText('Resources')).toBeTruthy()
    const { flexDirection } = window.getComputedStyle(
      container.firstElementChild as Element,
    )
    expect(flexDirection).toEqual('column')
  })
})
