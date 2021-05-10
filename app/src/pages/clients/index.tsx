import React, { useState, useEffect } from 'react'
import { gql, useLazyQuery } from '@apollo/client'

import styles from '../../styles/Home.module.css'

import { Client } from 'interfaces'
import { Cards, PlusCircle, ClientCard, FilterPanel } from 'components'

export const GET_ALL_CLIENTS = gql`
  query GetAllClient(
    $startDate: String
    $terminationDate: String
    $searchItem: String
  ) {
    clients(
      startDate: $startDate
      terminationDate: $terminationDate
      searchItem: $searchItem
    ) {
      id
      clientName
      description
      logoUrl
      startDate
      endDate
    }
  }
`

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const Clients = () => {
  const [data, setData] = useState<{ [key: string]: any }>({})
  const [error, setError] = useState<{ [key: string]: any } | null>(null)

  const [filter, setFilter] = useState({})

  const [getAllClients, { loading }] = useLazyQuery(GET_ALL_CLIENTS, {
    fetchPolicy: 'network-only',
    onCompleted: (res: Array<{ [key: string]: unknown }>) => {
      setData(res)
    },
    onError: (err: any) => {
      setError(err)
    },
  })

  useEffect(() => {
    getAllClients({ variables: filter })
  }, [filter, getAllClients])

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  const { clients } = data
  const page = 'Clients'

  const onClickFilter = (value: any) => {
    setFilter(value)
  }

  return (
    <>
      <div className={styles.container}>
        <FilterPanel page={page} onFilter={onClickFilter} />
        <Cards>
          {clients &&
            clients.map((client: Client) => {
              return <ClientCard key={client.id} client={client} />
            })}
        </Cards>
        <PlusCircle size="50" route="/clients/client" />
      </div>
    </>
  )
}

export default Clients
