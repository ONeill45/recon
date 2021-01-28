import '../styles/globals.css'
import Head from 'next/head'
import { AppProps } from 'next/app'
import { MsalProvider } from '@azure/msal-react'
import { PublicClientApplication, Configuration } from '@azure/msal-browser'
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
} from '@azure/msal-react'
import { NavBar } from '../components'
import Login from './login'

// Config object to be passed to Msal on creation
export const msalConfig: Configuration = {
  auth: {
    clientId: '8570b3ce-8294-4dba-9048-3f1f9f2eb7ad',
    authority:
      'https://login.microsoftonline.com/7f7697bc-3ee2-48f2-9d35-7cb75bddd74b',
    redirectUri: 'http://localhost:3000/',
    postLogoutRedirectUri: 'http://localhost:3000/',
  },
  cache: {
    cacheLocation: 'localStorage',
  },
}
const App = ({ Component, pageProps }: AppProps) => {
  const msalInstance = new PublicClientApplication(msalConfig)
  return (
    <>
      <Head>
        <title>Recon</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MsalProvider instance={msalInstance}>
        <NavBar />
        <AuthenticatedTemplate>
          <Component {...pageProps} />
        </AuthenticatedTemplate>
        <UnauthenticatedTemplate>
          <Login />
        </UnauthenticatedTemplate>
      </MsalProvider>
    </>
  )
}

export default App
