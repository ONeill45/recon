import React from 'react'
import { NavBar, Footer } from '../'

export const Layout: React.FC = ({ children }) => {
  return (
    <>
      <NavBar />
      {children}
      <Footer />
    </>
  )
}
