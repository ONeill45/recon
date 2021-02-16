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
import faker from 'faker'

type ResourceCardProps = {
  resource: Resource
}

export const ResourceCard = ({ resource }: ResourceCardProps) => {
  const {
    firstName,
    lastName,
    preferredName,
    title,
    startDate,
    terminationDate,
  } = resource

  const duration = getDurationText(startDate, terminationDate)
  return (
    <CardDiv>
      <LogoDiv>
        <LogoImg src={faker.image.avatar.toString()} />
      </LogoDiv>
      <CardDetailsDiv>
        <CardNameDiv>
          {preferredName ? preferredName : firstName} {lastName}
        </CardNameDiv>
        <CardDescriptionDiv>{title}</CardDescriptionDiv>
        <CardDurationDiv>{duration}</CardDurationDiv>
      </CardDetailsDiv>
    </CardDiv>
  )
}
