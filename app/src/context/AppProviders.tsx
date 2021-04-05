import React, { useState } from 'react'
import { ThemeProvider } from '@emotion/react'
import { ApolloProvider } from '@apollo/client'
import { MsalProvider } from '@azure/msal-react'
import { PublicClientApplication, Configuration } from '@azure/msal-browser'
import client from '../lib/apolloClient'
import { loadEnvironmentVariable } from 'utils/functions'
import { themeLight, themeDark } from '../styles/theme'

const getMsalConfig = (): Configuration => ({
  auth: {
    clientId: loadEnvironmentVariable(
      process.env.NEXT_PUBLIC_AZURE_CLIENT_ID,
      'NEXT_PUBLIC_AZURE_CLIENT_ID',
    ),
    authority: `https://login.microsoftonline.com/${loadEnvironmentVariable(
      process.env.NEXT_PUBLIC_AZURE_TENANT_ID,
      'NEXT_PUBLIC_AZURE_TENANT_ID',
    )}`,
    redirectUri: 'http://localhost:3000/',
    postLogoutRedirectUri: 'http://localhost:3000/',
  },
  cache: {
    cacheLocation: 'localStorage',
  },
})

export const AppProviders: React.FC = ({ children }) => {
  const msalInstance = new PublicClientApplication(getMsalConfig())
  const [darkTheme, setDarkTheme] = useState(true)

  return (
    <MsalProvider instance={msalInstance}>
      <ThemeProvider theme={darkTheme ? themeDark : themeLight}>
        <ApolloProvider client={client}>{children}</ApolloProvider>
      </ThemeProvider>
    </MsalProvider>
  )
}
