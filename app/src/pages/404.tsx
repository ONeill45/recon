import React from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { Button } from '../components'
import { useRouter } from 'next/router'

export default function e404() {

const router = useRouter()
  
  return (
    <div className={styles.container}>
      <Head>
        <title>Recon</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.description}>404 - Page Not Found</h1>
        <Button 
          color = "orange"
          onClick={() => router.push('/')}
        >
          Go Home
        </Button>
      </main>
    </div>
  )
}
