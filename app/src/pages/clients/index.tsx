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

const GET_ALL_CLIENTS_WITH_FILTER = gql`
  query GetAllClient($startDate: String, $endDate: String) {
    clients(startDate: $startDate, endDate: $endDate) {
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
  const page = 'Clients'

  const onClickFilter = (value: any) => {
    console.log(' = == = =    value = = = ', value)
  }

  return (
    <>
      <div className={styles.container}>
        <FilterPanel page={page} onFilter={onClickFilter} />
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
