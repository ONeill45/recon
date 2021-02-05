import styled from '@emotion/styled'
import { Client } from 'src/interfaces'
import { ClientCard } from './ClientCard'

type ClientCardsProps = {
  clients: Client[]
}

const CardsDiv = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`
export const ClientCards = ({ clients }: ClientCardsProps) => (
  <CardsDiv>
    {clients.map((client) => {
      return <ClientCard key={client.id} client={client}></ClientCard>
    })}
  </CardsDiv>
)
