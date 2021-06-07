import { extendTheme } from '@chakra-ui/react'

interface Theme {
  text: string
  background: string
  buttonText: string
  buttonTextHover: string
  buttonBorder: string
  buttonBg: string
  buttonBgHover: string
}

export interface EmotionComponentProps {
  theme?: Theme
}

export const themeLight: Theme = {
  text: '#000',
  background: '#fff',
  buttonText: '#000',
  buttonTextHover: '#fff',
  buttonBorder: '#000',
  buttonBg: 'rgba(0, 0, 0, 0)',
  buttonBgHover: 'rgba(0, 0, 0, 1)',
}

export const themeDark: Theme = {
  text: '#fff',
  background: '#121212',
  buttonText: '#fff',
  buttonTextHover: '#000',
  buttonBorder: '#fff',
  buttonBg: 'rgba(255, 255, 255, 0)',
  buttonBgHover: 'rgba(255, 255, 255, 1)',
}

export const chakraTheme = extendTheme({
  config: {
    useSystemColorMode: true,
  },
  colors: {
    primary: {
      50: '#ffeae3',
      100: '#f6c7be',
      200: '#e9a397',
      300: '#de7f6d',
      400: '#d45c45',
      500: '#ba422b',
      600: '#923221',
      700: '#682417',
      800: '#41140a',
      900: '#1d0300',
    },
    secondary: {
      50: '#f5effb',
      100: '#d7d6e0',
      200: '#bcbac6',
      300: '#a19ead',
      400: '#868395',
      500: '#6d697b',
      600: '#545261',
      700: '#3c3a46',
      800: '#24232c',
      900: '#0b0b16',
    },
  },
})
