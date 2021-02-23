import { MockedProvider } from '@apollo/client/testing'
import { render, waitFor } from '@testing-library/react'

export const renderComponent = async (
  // eslint-disable-next-line no-unused-vars
  Component: (props: any) => JSX.Element,
  props: any = {},
  mocks: any = null,
  waitForRender = true,
) => {
  const component = render(
    <MockedProvider mocks={mocks}>
      <Component {...props} />
    </MockedProvider>,
  )

  if (!waitForRender) return component

  await waitFor(() => new Promise((resolve) => setTimeout(resolve, 0)))
  return component
}

export const setInnerWidth = (width: number = 200) => {
  Object.defineProperty(window, 'innerWidth', {
    writable: true,
    configurable: true,
    value: width,
  })
}
