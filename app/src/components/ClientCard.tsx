import { Client } from 'src/interfaces'
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

type ClientCardProps = {
  client: Client
}

export const ClientCard = ({ client }: ClientCardProps) => {
  const { clientName, description, logoUrl, startDate, endDate } = client

  const duration = getDurationText(startDate, endDate)
  return (
    <CardDiv>
      <LogoDiv>
        <LogoImg src={logoUrl} />
      </LogoDiv>
      <CardDetailsDiv>
        <CardNameDiv>{clientName}</CardNameDiv>
        <CardDescriptionDiv>{description}</CardDescriptionDiv>
        <CardDurationDiv>{duration}</CardDurationDiv>
      </CardDetailsDiv>
    </CardDiv>
  )
}
