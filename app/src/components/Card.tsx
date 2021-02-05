import styled from '@emotion/styled'

export const CardDiv = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  box-shadow: 0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 14%),
    0 1px 5px 0 rgb(0 0 0 / 12%);
  height: auto;
  width: 200px;
  padding: 16px;
  margin: 16px;
`

export const CardDetailsDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding: 12px;
  align-items: center;
  justify-content: center;
  text-align: center;
`
export const CardNameDiv = styled.div`
  font-size: 16px;
  font-weight: bold;
  padding: 4px;
`

export const CardDescriptionDiv = styled.div`
  font-size: 12px;
  padding: 4px;
`

export const CardDurationDiv = styled.div`
  font-size: 12px;
  padding: 4px;
  color: grey;
`

export const LogoDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  width: 70px;
  height: 70px;
  box-shadow: 0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 14%),
    0 1px 5px 0 rgb(0 0 0 / 12%);
  overflow: hidden;
`
export const LogoImg = styled.img`
  height: auto;
  width: 60px;
`
