import styled from '@emotion/styled'
import React from 'react'
import { NavBar, Footer } from '../'

const ContentContainer = styled.main`
  flex-grow: 1;
  padding: 20px;
`

export const Layout: React.FC = ({ children }) => {
  return (
    <>
      <NavBar />
      <ContentContainer>{children}</ContentContainer>
      <Footer />
    </>
  )
}
