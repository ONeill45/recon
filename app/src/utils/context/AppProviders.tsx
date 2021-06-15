import React from 'react'
import { ChakraProvider } from '@chakra-ui/react'

import { ApolloProvider } from '@apollo/client'
import { MsalProvider } from '@azure/msal-react'
import { PublicClientApplication, Configuration } from '@azure/msal-browser'
import client from '../../lib/apolloClient'
import { loadEnvironmentVariable } from 'utils/functions'
import { chakraTheme } from '../../styles/theme'

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

  return (
    <MsalProvider instance={msalInstance}>
      <ChakraProvider theme={chakraTheme}>
        <ApolloProvider client={client}>{children}</ApolloProvider>
      </ChakraProvider>
    </MsalProvider>
  )
}
