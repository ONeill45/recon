import styles from '../../styles/Home.module.css'

import { Client } from 'interfaces'
import { Cards, PlusCircle, ClientCard, FilterPanel } from 'components'
import Footer from 'components/Footer'
import { gql, useQuery } from '@apollo/client'
import { useState } from 'react'

export const GET_ALL_CLIENTS = gql`
  query clients($searchItem: String) {
    clients(searchItem: $searchItem) {
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
  const [searchText, setSearchText] = useState('')

  const { data, loading, error } = useQuery(GET_ALL_CLIENTS, {
    fetchPolicy: 'network-only',
    variables: {
      searchItem: searchText,
    },
  })

  const searchClients = data?.clients

  if (error) {
    return <p>Error: {error.message}</p>
  } else if (data) {
    return (
      <>
        <div className={styles.container}>
          <FilterPanel onFilter={() => {}} setSearchText={setSearchText} />
          <Cards>
            {searchClients &&
              searchClients.map((client: Client) => {
                return <ClientCard key={client.id} client={client} />
              })}
          </Cards>
          <PlusCircle size="50" route="/clients/client" />
        </div>
        <Footer />
      </>
    )
  } else if (loading) {
    return <p>Loading...</p>
  } else {
    return
  }
}

export default Clients
