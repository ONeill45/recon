import React from 'react'
import styled from '@emotion/styled'

const SectionDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  width: 100%;
  margin: 2rem 0;
`

export const Sections: React.FC = ({ children }) => (
  <SectionDiv>{children}</SectionDiv>
)
