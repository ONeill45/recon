import React from 'react'
import { useMsal } from '@azure/msal-react'
import styled from '@emotion/styled'

import styles from '../styles/Home.module.css'
import { Button } from 'components/common/Button'

const LoginDiv = styled.div`
  text-align: center;
  padding-top: 40px;
`

const loginRequest = {
  scopes: ['User.Read'],
  prompt: 'select_account',
}

export const Login: React.FC = () => {
  const { instance } = useMsal()

  const handleLogin = async () => {
    try {
      await instance.loginPopup(loginRequest)
    } catch (error) {
      // TODO: need to implement a logger or better error catching logic
      console.error(error)
    }
  }

  return (
    <LoginDiv>
      <h1 className={styles.title}>Welcome to Recon!</h1>
      <br />
      <Button onClick={handleLogin}>Log In</Button>
    </LoginDiv>
  )
}
