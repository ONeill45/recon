import React, {
  createContext,
  FC,
  useContext,
  useEffect,
  useState,
} from 'react'
import { useRouter } from 'next/router'

type AuthContextType = {
  user: string | null
  setUser: (user: string | null) => void
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
})

export const AuthProvider: FC = ({ children }) => {
  const { pathname, events, push } = useRouter()
  const [user, setUser] = useState<string | null>(null)
  console.log('rendering', pathname)
  const getUser = async () => {
    try {
      const token = localStorage.getItem('user')
      if (token) setUser(token)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    console.log('pathname useEffect:', pathname)
    // check for token expiration?
    if (!user) {
      getUser()
    }
  }, [pathname])

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      console.log(pathname, 'handling route change')
      if (url !== '/login' && !user) {
        console.log('url', url)
        push('/login')
      }
    }

    if (pathname !== '/login' && !user) {
      console.log('user useEffect:', user, pathname)
      push('/login')
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

export const useAuthContext = () => useContext(AuthContext)
