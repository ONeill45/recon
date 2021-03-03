import { Resource } from 'interfaces'
import {
  HeaderDescriptionDiv,
  HeaderDiv,
  HeaderNameDiv,
  SubHeaderDiv,
} from './Header'
import { LogoDiv, LogoImg } from './Logo'

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
        <HeaderNameDiv>
          {preferredName || firstName} {lastName}
        </HeaderNameDiv>
        <HeaderDescriptionDiv>{email}</HeaderDescriptionDiv>
        <HeaderDescriptionDiv>{title}</HeaderDescriptionDiv>
      </SubHeaderDiv>
    </HeaderDiv>
  )
}
