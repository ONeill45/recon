/* istanbul ignore file */
import React, { useState } from 'react'
import styled from '@emotion/styled'
import styles from '../styles/Home.module.css'
import { Button, FullPageSpinner, Spinner } from '../components'
import { useTheme } from '../utils/context'

const Main = styled.main`
  background-color: ${(props) => props.theme.background};
  color: ${(props) => props.theme.text};
  min-height: 85vh;
  padding: 5rem 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`
const Home = () => {
  const [showSpinner, setShowSpinner] = useState(false)
  const { isDark, setIsDark } = useTheme()
  return (
    <>
      <div className={styles.container}>
        <Main>
          <h1 className={styles.title}>Welcome to Recon!</h1>

          <p>
            Here's a styled spinner: <Spinner />
          </p>

          <Button color="orange" onClick={() => setIsDark(!isDark)}>
            Click here to update theme
          </Button>

          <Button color="orange" onClick={() => setShowSpinner(!showSpinner)}>
            Here's a styled button. Click me to toggle a bigger spinner below
          </Button>

          {showSpinner ? <FullPageSpinner /> : <div />}
        </Main>
      </div>
    </>
  )
}

export default Home
