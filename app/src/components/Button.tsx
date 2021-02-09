import styled from '@emotion/styled'

export const Button = styled.button`
  padding: 8px;
  background-color: ${(props) => props.color};
  font-size: 14px;
  border-radius: 4px;
  color: black;
  font-weight: bold;
  &:hover {
    color: white;
  }
  cursor: pointer;
`
