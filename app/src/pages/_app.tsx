import '../styles/globals.css'
import Head from 'next/head'
import { AppProps } from 'next/app'
import { ThemeProvider } from '@emotion/react'
import { ApolloProvider } from '@apollo/client'
import { MsalProvider } from '@azure/msal-react'
import { PublicClientApplication, Configuration } from '@azure/msal-browser'
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
} from '@azure/msal-react'

import client from '../lib/apolloClient'
import { Login, NavBar } from 'components'
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

const App = ({ Component, pageProps }: AppProps) => {
  const msalInstance = new PublicClientApplication(getMsalConfig())

  return (
    <>
      <Head>
        <title>Recon</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MsalProvider instance={msalInstance}>
        <NavBar />
        <AuthenticatedTemplate>
          <ThemeProvider theme={theme}>
            <ApolloProvider client={client}>
              <Component {...pageProps} />
            </ApolloProvider>
          </ThemeProvider>
        </AuthenticatedTemplate>
        <UnauthenticatedTemplate>
          <Login />
        </UnauthenticatedTemplate>
      </MsalProvider>
    </>
  )
}

export default App
