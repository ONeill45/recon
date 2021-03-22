import React from 'react'
import '../styles/globals.css'
import { ThemeProvider } from '@emotion/react'
import { ApolloProvider } from '@apollo/client'
import { MsalProvider } from '@azure/msal-react'
import { PublicClientApplication, Configuration } from '@azure/msal-browser'
import client from '../lib/apolloClient'
import { loadEnvironmentVariable } from 'utils/functions'

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
const theme = {
  fontFamily: 'Avenir Book, Arial, Verdana, sans-serif',
}

export const AppProviders: React.FC = ({ children }) => {
  const msalInstance = new PublicClientApplication(getMsalConfig())

  return (
    <MsalProvider instance={msalInstance}>
      <ThemeProvider theme={theme}>
        <ApolloProvider client={client}>{children}</ApolloProvider>
      </ThemeProvider>
    </MsalProvider>
  )
}
