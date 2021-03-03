import React from 'react'
import styled from '@emotion/styled'

const CardsDiv = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  width: 100%;
`
const CardContentDiv = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
  &:after {
    content: '';
    flex: auto;
  }
`
export const Cards: React.FC = ({ children }) => (
  <CardsDiv>
    <CardContentDiv>{children}</CardContentDiv>
  </CardsDiv>
)
