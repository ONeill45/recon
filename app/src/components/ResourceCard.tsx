import { Resource } from 'interfaces'
import { getDurationText } from '../utils'
import {
  CardDescriptionDiv,
  CardDetailsDiv,
  CardDiv,
  CardDurationDiv,
  CardNameDiv,
  LogoDiv,
  LogoImg,
} from './Card'

type ResourceCardProps = {
  resource: Resource
}

export const ResourceCard = ({ resource }: ResourceCardProps) => {
  const {
    firstName,
    lastName,
    preferredName,
    title,
    department,
    imageUrl,
    startDate,
    terminationDate,
  } = resource

  const duration = getDurationText(startDate, terminationDate)
  return (
    <CardDiv>
      <LogoDiv>
        <LogoImg src={imageUrl} />
      </LogoDiv>
      <CardDetailsDiv>
        <CardNameDiv>
          {preferredName ? preferredName : firstName} {lastName}
        </CardNameDiv>
        <CardDescriptionDiv>{title}</CardDescriptionDiv>
        <CardDescriptionDiv>{department}</CardDescriptionDiv>
        <CardDurationDiv>{duration}</CardDurationDiv>
      </CardDetailsDiv>
    </CardDiv>
  )
}
