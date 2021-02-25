import { Client } from 'interfaces'
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
import { useRouter } from 'next/router'
import React from 'react'

type ClientCardProps = {
  client: Client
}

export const ClientCard = ({ client }: ClientCardProps) => {
  const router = useRouter()

  const { id, clientName, description, logoUrl, startDate, endDate } = client

  const duration = getDurationText(startDate, endDate)

  function viewClient(clientid: string ) {
    router.push({
      pathname: '/clients/client',
      query: { id: clientid }
  })
  }

  return (
    <CardDiv onClick={() => viewClient(id)}>
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
