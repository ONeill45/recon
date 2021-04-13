/* istanbul ignore file */
import React, { useState } from 'react'
import styles from '../styles/Home.module.css'
import { Button, FilterPanel, FullPageSpinner, Spinner } from '../components'

const Home = () => {
  const [showSpinner, setShowSpinner] = useState(false)

  return (
    <>
      <div className={styles.container}>
        <FilterPanel onFilter={() => {}} />
        <main className={styles.main}>
          <h1 className={styles.title}>Welcome to Recon!</h1>

          <p>
            Here's a styled spinner: <Spinner />
          </p>

          <Button color="orange" onClick={() => setShowSpinner(!showSpinner)}>
            Here's a styled button. Click me to toggle a bigger spinner below
          </Button>

          {showSpinner ? <FullPageSpinner /> : <div />}
        </main>
      </div>
    </>
  )
}

export default Home
