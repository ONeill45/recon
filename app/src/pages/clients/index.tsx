import { gql, useQuery } from '@apollo/client'

import styles from '../../styles/Home.module.css'

import { Client } from 'interfaces'
import { Cards, PlusCircle, ClientCard, FilterPanel } from 'components'

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
      <div className={styles.container}>
        <FilterPanel page={null} onFilter={() => {}} />
        <Cards>
          {clients.map((client: Client) => {
            return <ClientCard key={client.id} client={client} />
          })}
        </Cards>
        <PlusCircle size="50" route="/clients/client" />
      </div>
    </>
  )
}

export default Clients
