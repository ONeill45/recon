import React, { useState } from 'react'
import styles from '../styles/Home.module.css'
import { Button, FullPageSpinner, Spinner } from 'components'

const Home = () => {
  const [showSpinner, setShowSpinner] = useState(false)

  return (
    <div className={styles.container}>
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

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}

export default Home
