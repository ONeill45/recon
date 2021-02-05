import '../styles/globals.css'
import { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client'

import client from '../lib/apolloClient'
import { NavBar } from '../components'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <NavBar />
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    </>
  )
}

export default MyApp
