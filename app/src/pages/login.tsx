import React, { useEffect } from 'react'
import { useAuthContext } from 'src/utils/context'
import { useRouter } from 'next/router'
import { useMsal } from '@azure/msal-react'
import styled from '@emotion/styled'

const LoginDiv = styled.div({
  height: '90vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})

// Add here scopes for id token to be used at MS Identity Platform endpoints.
export const loginRequest = {
  scopes: [],
  prompt: 'select_account',
}

const Login = () => {
  // @ts-ignore
  const { user, setUser } = useAuthContext()
  const router = useRouter()

  useEffect(() => {
    if (user) {
      router.push('/')
    }
  }, [user])

  const { instance } = useMsal()

  const handleLogin = async () => {
    const response = await instance.loginPopup(loginRequest)
    console.log(response)
  }

  return (
    <LoginDiv>
      <button onClick={handleLogin}>Log In</button>
    </LoginDiv>
  )
}

export default Login
