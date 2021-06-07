// import { mockMatchMedia } from '../testUtils/mockMatchMedia'
import { act } from 'react-dom/test-utils'
import userEvent from '@testing-library/user-event'
import MatchMediaMock from 'jest-matchmedia-mock'

import { NavBar } from 'components'
import { applyMockUseRouter, render } from '../testUtils'
import { mockBreakpointsMediaQueries } from '../testUtils/breakpoints'
import { waitFor } from '@testing-library/dom'

let matchMedia: MatchMediaMock

applyMockUseRouter()

describe('<NavBar />', () => {
  beforeAll(() => {
    matchMedia = new MatchMediaMock()
  })

  beforeEach(() => {
    matchMedia.useMediaQuery(mockBreakpointsMediaQueries.md)
  })

  afterEach(() => {
    matchMedia.clear()
  })

  it('should show the full nav bar by default', async () => {
    const { queryByTestId } = await render(NavBar)

    expect(queryByTestId('FullNav')).toBeInTheDocument()
    expect(queryByTestId('CollapsedNav')).not.toBeInTheDocument()
    expect(queryByTestId('SideNav')).not.toBeInTheDocument()
  })

  it('should show the collapsed nav when screen is too small for full nav', async () => {
    matchMedia.useMediaQuery(mockBreakpointsMediaQueries.sm)
    const { queryByTestId } = await render(NavBar)

    expect(queryByTestId('FullNav')).not.toBeInTheDocument()
    expect(queryByTestId('CollapsedNav')).toBeInTheDocument()
    expect(queryByTestId('SideNav')).not.toBeInTheDocument()
  })

  it('should collapse nav bar when screen is resized below threshold', async () => {
    const { queryByTestId, container } = await render(NavBar)
    expect(queryByTestId('FullNav')).toBeInTheDocument()
    expect(queryByTestId('CollapsedNav')).not.toBeInTheDocument()
    act(() => {
      matchMedia.useMediaQuery(mockBreakpointsMediaQueries.sm)
    })

    waitFor(
      () => {
        expect(queryByTestId('FullNav')).not.toBeInTheDocument()
        expect(queryByTestId('CollapsedNav')).toBeInTheDocument()
      },
      {
        container: container,
      },
    )
  })

  it('should open side nav when hamburger menu is clicked', async () => {
    matchMedia.useMediaQuery(mockBreakpointsMediaQueries.sm)
    const { queryByTestId } = await render(NavBar)

    queryByTestId('CollapsedNav')?.click()

    expect(queryByTestId('SideNav')).toBeVisible()
  })

  it('should close side nav when area outside is clicked', async () => {
    matchMedia.useMediaQuery(mockBreakpointsMediaQueries.sm)

    const { getByTestId, queryByTestId, container } = await render(NavBar)

    userEvent.click(getByTestId('CollapsedNav'))

    expect(queryByTestId('SideNav')).toBeInTheDocument()

    userEvent.click(getByTestId('SideNavOverlay'))

    waitFor(() => expect(queryByTestId('SideNav')).not.toBeInTheDocument(), {
      container: container,
    })
  })
})
