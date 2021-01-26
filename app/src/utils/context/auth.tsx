import React, {
  createContext,
  FC,
  useContext,
  useEffect,
  useState,
} from 'react'
import { useRouter } from 'next/router'

const AuthContext = createContext({})

export const AuthProvider: FC = ({ children }) => {
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

export const useAuthContext = () => useContext(AuthContext)
