import styles from '../../styles/Home.module.css'

import { Client } from 'interfaces'
import { Cards, PlusCircle, ClientCard, FilterPanel } from 'components'
import Footer from 'components/Footer'
import { gql, useQuery } from '@apollo/client'
import { useState } from 'react'

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

const GET_SEARCHED_CLIENTS = gql`
  query SearchClient($searchItem: String!) {
    searchClient(searchItem: $searchItem) {
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

  const [searchText, setSearchText] = useState('')

  const searchQuery = useQuery(GET_SEARCHED_CLIENTS, {
    fetchPolicy: 'network-only',
    variables: {
      searchItem: searchText,
    },
  })

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  const searchClients = searchQuery.data
    ? searchQuery.data.searchClient
    : data.clients

  return (
    <>
      <div className={styles.container}>
        <FilterPanel searchQuery={searchQuery} setSearchText={setSearchText} />
        <Cards>
          {searchClients.map((client: Client) => {
            return <ClientCard key={client.id} client={client} />
          })}
        </Cards>
        <PlusCircle size="50" route="/clients/client" />
      </div>
      <Footer />
    </>
  )
}

export default Clients
