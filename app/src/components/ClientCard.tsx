import { Client } from 'interfaces'
import { getRelativeTime } from '../utils'
import { CardDescriptionDiv, CardDiv, CardNameDiv } from './Card'
import { LogoDiv, LogoImg } from './Logo'

type ClientCardProps = {
  client: Client
}

export const ClientCard = ({ client }: ClientCardProps) => {
  const { clientName, description, logoUrl, startDate, endDate } = client

  const duration = getRelativeTime(startDate, endDate)
  return (
    <CardDiv>
      <LogoDiv>
        <LogoImg src={logoUrl} />
      </LogoDiv>
      <CardNameDiv>{clientName}</CardNameDiv>
      <CardDescriptionDiv>{description}</CardDescriptionDiv>
      <CardDescriptionDiv color="grey">{duration}</CardDescriptionDiv>
    </CardDiv>
  )
}
