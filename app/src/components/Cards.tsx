import React, { FC } from 'react'
import styled from '@emotion/styled'

const CardsDiv = styled.div`
  margin: 12px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-auto-rows: auto;
  grid-gap: 12px;
  width: 100%;
  /* height: 300px; */
`

export const Cards: FC = ({ children }) => <CardsDiv>{children}</CardsDiv>
