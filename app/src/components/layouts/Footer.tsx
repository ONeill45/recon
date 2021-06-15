import React from 'react'
import styled from '@emotion/styled'
import { EmotionComponentProps } from 'styles/theme'

const StyledFooter = styled.footer<EmotionComponentProps>`
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 70px;
  border-top: 1px solid #eaeaea;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    margin-left: 0.5rem;
    height: 1em;
    color: ${({ theme }) => theme.text};
  }

  a {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`

export const Footer: React.FC = () => {
  return (
    <StyledFooter>
      <a
        href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
        target="_blank"
        rel="noopener noreferrer"
      >
        Powered by <img src="/vercel.svg" alt="Vercel Logo" />
      </a>
    </StyledFooter>
  )
}

export default Footer
