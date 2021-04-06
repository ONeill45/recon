import '../styles/globals.css'
import Head from 'next/head'
import { AppProps } from 'next/app'
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
} from '@azure/msal-react'

import { Login, NavBar } from 'components'
import { AppProviders } from '../utils/context'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>Recon</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppProviders>
        <NavBar />
        <AuthenticatedTemplate>
          <Component {...pageProps} />
        </AuthenticatedTemplate>
        <UnauthenticatedTemplate>
          <Login />
        </UnauthenticatedTemplate>
      </AppProviders>
    </>
  )
}

export default App
