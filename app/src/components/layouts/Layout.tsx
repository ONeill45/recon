import React from 'react'
import { NavBar } from '../'

export const Layout: React.FC = ({ children }) => {
  return (
    <>
      <NavBar />
      {children}
      {/* <Footer /> */}
    </>
  )
}
