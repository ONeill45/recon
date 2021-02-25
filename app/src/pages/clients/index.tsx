import { gql, useQuery } from '@apollo/client'

import { Client } from 'interfaces'
import { Cards, PlusCircle, ClientCard } from 'components'

const GET_ALL_CLIENTS = gql`
  {
    clients {
      id
      clientName
      description
      logoUrl
      startDate
      endDate
    }
  }
`

const Clients = () => {
  const { data, loading, error } = useQuery(GET_ALL_CLIENTS, {
    fetchPolicy: 'network-only',
  })

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  const { clients } = data

  return (
    <>
      <Cards>
        <PlusCircle size={'50'} route={'/clients/client'} />
        {clients.map((client: Client) => {
          return <ClientCard key={client.id} client={client}></ClientCard>
        })}
      </Cards>
    </>
  )
}

export default Clients
