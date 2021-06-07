import styled from '@emotion/styled'
import React from 'react'
import { NavBar } from 'components/NavBar'
import { Footer } from 'components/layouts/Footer'

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
