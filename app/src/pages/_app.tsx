import '../styles/globals.css'
import Head from 'next/head'
import { AppProps } from 'next/app'
import { createContext, FC, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'

const AuthContext = createContext({})

const AuthProvider: FC = ({ children }) => {
  const { pathname, events } = useRouter()
  const [user, setUser] = useState<string | null>(null)

  const getUser = async () => {
    try {
      // implement actual logic :)
      const token = await Promise.resolve('test')
      setUser(token)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    getUser()
  }, [pathname])

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      if (url !== '/login' && !user) {
        window.location.href = '/login'
      }
    }

    if (pathname !== '/login' && user) {
      window.location.href = '/login'
    }

    events.on('routeChangeStart', handleRouteChange)
    return () => {
      events.off('routeChangeStart', handleRouteChange)
    }
  }, [user])

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>Recon</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AuthProvider>
        {/* <NavBar /> */}
        <Component {...pageProps} />
      </AuthProvider>
    </>
  )
}

export default App
