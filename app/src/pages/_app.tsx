import React from 'react'
import '../styles/globals.css'
import { NavBar } from '../components'
import { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  const [collapsed, setCollapsed] = React.useState(false)
  // const [mQuery, setMQuery] = React.useState<any>({
  //   matches: window.innerWidth > 768 ? true : false,
  // });

  React.useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)')
    mediaQuery.addEventListener('change', (e) => setCollapsed(e.matches))

    return () =>
      mediaQuery.removeEventListener('change', (e) => setCollapsed(e.matches))
  }, [])

  return (
    <>
      <NavBar collapsed={collapsed} />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
