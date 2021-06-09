import React, { useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import { useQuery } from '@apollo/client'

import styles from 'styles/Home.module.css'
import { Client } from 'interfaces'
import { CardsContainer } from 'components/layouts/CardsContainer'
import { ClientCard } from 'components/clients/ClientCard'
import { FilterPanel } from 'components/FilterPanel'
import { LinkButton } from 'components/common/Button'
import { PageHeader } from 'components/common/PageHeader'

import { GET_ALL_CLIENTS } from 'queries'

export const Clients: React.FC = () => {
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
