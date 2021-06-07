import React from 'react'

import { Client } from 'interfaces'
import { getRelativeTime } from 'utils'
import { Card, CardDescriptionDiv, CardNameDiv } from 'components/Card'
import { LogoDiv, LogoImg } from 'components/Logo'

type ClientCardProps = {
  client: Client
}

export const ClientCard: React.FC<ClientCardProps> = ({ client }) => {
  const { id, clientName, description, logoUrl, startDate, endDate } = client

  const duration = getRelativeTime(startDate, endDate)

  return (
    <Card link={`/clients/client/${id}`}>
      <LogoDiv>
        <LogoImg src={logoUrl} />
      </LogoDiv>
      <CardNameDiv>{clientName}</CardNameDiv>
      <CardDescriptionDiv>{description}</CardDescriptionDiv>
      <CardDescriptionDiv color="grey">{duration}</CardDescriptionDiv>
    </Card>
  )
}
