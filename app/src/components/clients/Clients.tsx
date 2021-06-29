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
  // const [searchClients, setSearchClients] = useState<{ [key: string]: any }>([])
  const [filter, setFilter] = useState({})
  const [data, setData] = useState<{ [key: string]: any }>({})
  const [error, setError] = useState<{ [key: string]: any } | undefined>(
    undefined,
  )
  const page = 'Clients'

  const [getAllClients, { loading }] = useLazyQuery(GET_ALL_CLIENTS, {
    fetchPolicy: 'network-only',
    onCompleted: (res: { [key: string]: any }) => {
      setData(res)
    },
    onError: (err: any) => {
      setError(err)
    },
  })

  useEffect(() => {
    handleOnFilter({ searchItem: searchText }, false)
  }, [searchText])

  useEffect(() => {
    setData({})
    setError(undefined)
    getAllClients({ variables: filter })
  }, [filter, getAllClients])

  const handleOnFilter = (
    queryFilter: Record<string, any>,
    filterClicked = false,
  ) => {
    if (!queryFilter['searchItem']) {
      queryFilter['searchItem'] = searchText
    }
    setFilter((prev: any) => {
      return filterClicked ? { ...queryFilter } : { ...prev, ...queryFilter }
    })
  }

  const { clients } = data

  const renderContent = () => {
    if (loading) {
      return <p>Loading...</p>
    } else if (error) {
      return <p>Error: {error.message}</p>
    } else if (data) {
      return (
        <CardsContainer>
          {clients &&
            clients.map((client: Client) => {
              return <ClientCard key={client.id} client={client} />
            })}
        </CardsContainer>
      )
    }

    return <p></p>
  }

  return (
    <>
      <PageHeader headerText="Clients">
        <LinkButton href="/clients/client" rightIcon={<FaPlus />}>
          Create
        </LinkButton>
        <FilterPanel
          setSearchText={setSearchText}
          page={page}
          onFilter={handleOnFilter}
        />
      </PageHeader>
      <div className={styles.container}>{renderContent()}</div>
    </>
  )
}
