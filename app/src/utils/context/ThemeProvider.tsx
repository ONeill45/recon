import React, { useState } from 'react'
import {
  ThemeProvider as EThemeProvider,
  useTheme as useEmotionTheme,
} from '@emotion/react'
import { themeLight, themeDark } from '../../styles/theme'

export const ThemeContext = React.createContext<any | undefined>(undefined)

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

export const useTheme = () => {
  const context = React.useContext(ThemeContext)
  const theme = useEmotionTheme()
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return { theme, ...context }
}
