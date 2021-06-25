import { MockedProvider } from '@apollo/client/testing'
import { ThemeProvider } from '@emotion/react'
import {
  render as rtlRender,
  RenderResult,
  waitFor,
} from '@testing-library/react'
import { mockTheme } from './mockTheme'

export const render = async (
  // eslint-disable-next-line no-unused-vars
  Component: (props: any) => JSX.Element | null,
  props: any = {},
  mocks: any = undefined,
  waitForRender = true,
): Promise<RenderResult> => {
  const container = rtlRender(
    mocks === undefined ? (
      <ThemeProvider theme={mockTheme}>
        <Component {...props} />
      </ThemeProvider>
    ) : (
      <ThemeProvider theme={mockTheme}>
        <MockedProvider mocks={mocks} addTypename={false}>
          <Component {...props} />
        </MockedProvider>
      </ThemeProvider>
    ),
  )

  if (!waitForRender) return container

  await waitFor(() => new Promise((resolve) => setTimeout(resolve, 0)))
  return container
}
