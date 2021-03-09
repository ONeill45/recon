import React from 'react'
import styled from '@emotion/styled'

const CardsDiv = styled.div`
  margin: 12px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-auto-rows: auto;
  grid-gap: 12px;
`

export const Cards: React.FC = ({ children }) => <CardsDiv>{children}</CardsDiv>
