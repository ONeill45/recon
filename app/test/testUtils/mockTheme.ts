import { chakraTheme } from '../../src/styles/theme'
import { mockBreakpoints } from './breakpoints'

export const mockTheme = Object.assign({}, chakraTheme, {
  breakpoints: mockBreakpoints,
})
