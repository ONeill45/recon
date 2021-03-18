import { css } from '@emotion/react'
import styled from '@emotion/styled'

type cardProps = {
  clickable?: boolean
}

const isClickable = ({ clickable }: cardProps) => {
  if (clickable) {
    return css`
      cursor: pointer;
      &:hover {
        outline: 1px solid black;
      }
    `
  }
  return ''
}

export const CardDiv = styled.div<cardProps>`
  ${isClickable}
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  box-shadow: 0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 14%),
    0 1px 5px 0 rgb(0 0 0 / 12%);
  height: auto;
  padding: 16px;
  width: 100%;
  flex-grow: 1;
`
export const CardNameDiv = styled.div`
  font-size: 16px;
  font-weight: bold;
  padding: 4px;
  text-align: center;
`

export const CardDetailsDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding: 12px;
  align-self: flex-start;
  text-align: left;
`

type cardDescriptionProps = {
  color?: string
}
export const CardDescriptionDiv = styled.div<cardDescriptionProps>`
  font-size: 12px;
  padding: 4px;
  align-items: center;
  text-align: center;
  ${(props) =>
    props.color ? `color: ${props.color}` /* istanbul ignore next */ : ''};
`
