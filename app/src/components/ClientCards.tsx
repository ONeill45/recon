import styled from '@emotion/styled'
import { ClientCard } from './ClientCard'

type Client = {
  id: string
  clientName: string
  description: string
  logoUrl: string
  startDate: Date
  endDate: Date
}

type ClientCardsProps = {
  clients: Client[]
}

const CardsDiv = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`
export const ClientCards = ({ clients }: ClientCardsProps) => {
  return (
    <CardsDiv>
      {clients.map((client) => {
        return <ClientCard key={client.id} client={client}></ClientCard>
      })}
    </CardsDiv>
  )
}
