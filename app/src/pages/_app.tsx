import '../styles/globals.css'
import Head from 'next/head'
import { AppProps } from 'next/app'
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
} from '@azure/msal-react'

import { Login, Layout } from 'components'
import { AppProviders } from '../utils/context'
import React from 'react'
import { chakraTheme } from '../styles/theme'
import { ColorModeScript } from '@chakra-ui/react'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>Recon</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cabin:wght@400;500;700&family=MuseoModerno:wght@700&family=Roboto+Condensed:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <ColorModeScript
          initialColorMode={chakraTheme.config.initialColorMode}
        />
      </Head>
      <AppProviders>
        <AuthenticatedTemplate>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </AuthenticatedTemplate>
        <UnauthenticatedTemplate>
          <Login />
        </UnauthenticatedTemplate>
      </AppProviders>
    </>
  )
}

export default App
