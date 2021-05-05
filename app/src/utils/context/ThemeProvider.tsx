import React, { useState } from 'react'
import {
  Theme,
  ThemeProvider as EThemeProvider,
  useTheme as useEmotionTheme,
} from '@emotion/react'
import { themeLight, themeDark } from '../../styles/theme'

export interface ThemeContextType {
  isDark: boolean
  setIsDark: (b: boolean) => void
}
export const ThemeContext = React.createContext<ThemeContextType | undefined>(
  undefined,
)

export const ThemeProvider: React.FC = ({ children }) => {
  const [isDark, setIsDark] = useState(true)

  return (
    <ThemeContext.Provider value={{ isDark, setIsDark }}>
      <EThemeProvider theme={isDark ? themeDark : themeLight}>
        {children}
      </EThemeProvider>
    </ThemeContext.Provider>
  )
}
export interface UseThemeType extends ThemeContextType {
  theme: Theme
}

export const useTheme = (): UseThemeType => {
  const context = React.useContext<ThemeContextType | undefined>(ThemeContext)
  const theme = useEmotionTheme()
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return { theme, ...context }
}
