import styled from '@emotion/styled'

export const HeaderDiv = styled.div`
  display: flex;
  border-bottom: 1px solid black;
  padding: 10px;
  position: relative;
`

export const SubHeaderDiv = styled.div`
  padding: 10px 10px;
`

export const HeaderNameDiv = styled.div`
  font-size: 16px;
  font-weight: bold;
  padding: 4px;
`

export const HeaderDescriptionDiv = styled.div`
  font-size: 12px;
  padding: 4px;
`

export const PencilIcon = styled.img`
  border: 1px solid black;
  padding: 10px;
  border-radius: 5px;
  height: 35px;
  width: 35px;
  cursor: pointer;
  &:hover {
    background-color: #999;
  }
`
