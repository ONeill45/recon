import styled from '@emotion/styled'
import { Resource } from 'interfaces'

const NameDiv = styled.div`
  font-size: 16px;
  font-weight: bold;
  padding: 4px;
`

const DescriptionDiv = styled.div`
  font-size: 12px;
  padding: 4px;
`

const HeaderDiv = styled.div`
  display: flex;
  border-bottom: 1px solid black;
  padding: 10px;
`
const SubHeaderDiv = styled.div`
  padding: 10px 10px;
`

const LogoDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  width: 100px;
  height: 100px;
  box-shadow: 0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 14%),
    0 1px 5px 0 rgb(0 0 0 / 12%);
  overflow: hidden;
`

const LogoImg = styled.img`
  height: auto;
  width: 80px;
`

type ResourceHeaderProps = {
  resource: Resource
}

export const ResourceHeader = ({ resource }: ResourceHeaderProps) => {
  const {
    firstName,
    lastName,
    preferredName,
    title,
    imageUrl,
    email,
  } = resource

  return (
    <HeaderDiv>
      <LogoDiv>
        <LogoImg src={imageUrl || '/images/default-avatar-500x500.png'} />
      </LogoDiv>
      <SubHeaderDiv>
        <NameDiv>
          {preferredName || firstName} {lastName}
        </NameDiv>
        <DescriptionDiv>{email}</DescriptionDiv>
        <DescriptionDiv>{title}</DescriptionDiv>
      </SubHeaderDiv>
    </HeaderDiv>
  )
}
