import { MockedProvider } from '@apollo/client/testing'
import { render as rtlRender, waitFor } from '@testing-library/react'

export const render = async (
  // eslint-disable-next-line no-unused-vars
  Component: (props: any) => JSX.Element,
  props: any = {},
  mocks: any = undefined,
  waitForRender = true,
) => {
  const container = rtlRender(
    mocks === undefined ? (
      <Component {...props} />
    ) : (
      <MockedProvider mocks={mocks} addTypename={false}>
        <Component {...props} />
      </MockedProvider>
    ),
  )

  if (!waitForRender) return container

  await waitFor(() => new Promise((resolve) => setTimeout(resolve, 0)))
  return container
}

export const setInnerWidth = (width: number = 200) => {
  Object.defineProperty(window, 'innerWidth', {
    writable: true,
    configurable: true,
    value: width,
  })
}
