import styled from '@emotion/styled'

export const Button = styled.button`
  padding: 32px;
  background-color: ${(props) => props.color};
  font-size: 24px;
  border-radius: 4px;
  color: black;
  font-weight: bold;
  &:hover {
    color: white;
  }
`
