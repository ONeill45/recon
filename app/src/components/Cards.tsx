import React from 'react'
import styled from '@emotion/styled'

const CardsDiv = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
`
export const Cards: React.FC = ({ children }) => <CardsDiv>{children}</CardsDiv>
