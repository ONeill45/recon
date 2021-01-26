import '../styles/globals.css'
import Head from 'next/head'
import { AppProps } from 'next/app'

import { NavBar } from '../components'
import { AuthProvider } from '../utils/context'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>Recon</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AuthProvider>
        <NavBar />
        <Component {...pageProps} />
      </AuthProvider>
    </>
  )
}

export default App
