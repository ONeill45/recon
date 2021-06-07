import React from 'react'

import { Resource } from 'interfaces'
import {
  HeaderDescriptionDiv,
  HeaderDiv,
  HeaderNameDiv,
  SubHeaderDiv,
} from 'components/layouts/Header'
import { LogoDiv, LogoImg } from 'components/Logo'
import { Pencil } from 'components/Pencil'

type ResourceHeaderProps = {
  resource: Resource
}

export const ResourceHeader: React.FC<ResourceHeaderProps> = ({ resource }) => {
  const {
    id,
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
      <Pencil size={'30'} route={'/resources/resource'} id={id} />
    </HeaderDiv>
  )
}
