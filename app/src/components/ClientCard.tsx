import { Client } from 'interfaces'
import { useRouter } from 'next/router'
import { getRelativeTime } from '../utils'
import { CardDescriptionDiv, CardDiv, CardNameDiv } from './Card'
import { LogoDiv, LogoImg } from './Logo'

type ClientCardProps = {
  client: Client
}

export const ClientCard = ({ client }: ClientCardProps) => {
  const router = useRouter()

  const { id, clientName, description, logoUrl, startDate, endDate } = client

  const duration = getRelativeTime(startDate, endDate)

  const viewClient = () => {
    router.push({
      pathname: '/clients/client',
      query: { id },
    })
  }

  return (
    <CardDiv onClick={viewClient}>
      <LogoDiv>
        <LogoImg src={logoUrl} />
      </LogoDiv>
      <CardNameDiv>{clientName}</CardNameDiv>
      <CardDescriptionDiv>{description}</CardDescriptionDiv>
      <CardDescriptionDiv color="grey">{duration}</CardDescriptionDiv>
    </CardDiv>
  )
}
