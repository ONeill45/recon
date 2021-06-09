import styles from '../../styles/Home.module.css'

import { Client } from 'interfaces'
import { CardsContainer, ClientCard, FilterPanel, LinkButton } from 'components'
import { gql, useQuery } from '@apollo/client'
import { useState } from 'react'
import React from 'react'
import { FaPlus } from 'react-icons/fa'
import { PageHeader } from '../../components/PageHeader'

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

const Clients: React.FC = () => {
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
        <PageHeader headerText="Clients">
          <LinkButton href="/clients/client" rightIcon={<FaPlus />}>
            Create
          </LinkButton>
          <FilterPanel onFilter={() => {}} setSearchText={setSearchText} />
        </PageHeader>
        <div className={styles.container}>
          <CardsContainer>
            {searchClients &&
              searchClients.map((client: Client) => {
                return <ClientCard key={client.id} client={client} />
              })}
          </CardsContainer>
        </div>
      </>
    )
  } else if (loading) {
    return <p>Loading...</p>
  } else {
    return <></>
  }
}

export default Clients
