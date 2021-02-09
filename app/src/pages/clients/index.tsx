import { ClientCards, PlusCircle } from '../../components'
import { gql, useQuery } from '@apollo/client'

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
      <PlusCircle size={'50'} route={'/clients/new'} />
      <ClientCards clients={clients}></ClientCards>
    </>
  )
}

export default Clients
