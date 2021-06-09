/* istanbul ignore file */
import React, { useState } from 'react'
import styled from '@emotion/styled'
import styles from '../styles/Home.module.css'
import { Button, FullPageSpinner, Spinner, FilterPanel } from '../components'
import { EmotionComponentProps } from 'styles/theme'
import { useColorMode } from '@chakra-ui/react'

const Main = styled.main<EmotionComponentProps>`
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  min-height: 85vh;
  padding: 5rem 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`
const Home: React.FC = () => {
  const [showSpinner, setShowSpinner] = useState(false)
  const { toggleColorMode } = useColorMode()
  return (
    <>
      <div className={styles.container}>
        <FilterPanel onFilter={() => {}} setSearchText={() => {}} />
        <Main>
          <h1 className={styles.title}>Welcome to Recon!</h1>

          <p>
            Here's a styled spinner: <Spinner />
          </p>

          <Button colorScheme="primary" onClick={toggleColorMode}>
            Click here to update theme
          </Button>

          <Button
            colorScheme="secondary"
            onClick={() => setShowSpinner(!showSpinner)}
          >
            Here's a styled button. Click me to toggle a bigger spinner below
          </Button>

          {showSpinner ? <FullPageSpinner /> : <div />}
        </Main>
      </div>
    </>
  )
}

export default Home
