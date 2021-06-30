import React, { useEffect, useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import { useLazyQuery } from '@apollo/client'

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
  const [searchClients, setSearchClients] = useState<{ [key: string]: any }>([])
  const [error, setError] = useState<{ [key: string]: any } | undefined>(
    undefined,
  )

  const [searchWithText, { loading }] = useLazyQuery(GET_ALL_CLIENTS, {
    fetchPolicy: 'network-only',
    onCompleted: (res: { [key: string]: any }) => {
      const resValues = res && Object.values(res)[0]
      setSearchClients(resValues)
    },
    onError: (err: any) => {
      setError(err)
    },
  })

  useEffect(() => {
    searchWithText({
      variables: {
        searchItem: searchText,
      },
    })
  }, [searchText, searchWithText])

  if (error) {
    return <p>Error: {error.message}</p>
  } else if (searchClients) {
    return (
      <>
        <PageHeader headerText="Clients">
          <LinkButton href="/clients/client" rightIcon={<FaPlus />}>
            Create
          </LinkButton>
          <FilterPanel
            onFilter={() => {}}
            searchText={searchText}
            setSearchText={setSearchText}
          />
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
    return <p id="loading">Loading...</p>
  } else {
    return <></>
  }
}
