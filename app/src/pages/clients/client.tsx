import React from 'react'
import { ClientForm } from 'components'
import { gql, useQuery } from '@apollo/client'
import { useRouter } from 'next/router'

export const GET_CLIENT_FROM_ID = gql`
  query GetClient($id: String!) {
    client(id: $id) {
      id
      clientName
      description
      logoUrl
      startDate
      endDate
    }
  }
`
export const Client = () => {
  const router = useRouter()
  const { id } = router.query

  const { data, loading, error } = useQuery(GET_CLIENT_FROM_ID, {
    fetchPolicy: 'network-only',
    variables: { id: id },
    skip: !id,
  })

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  const { client = {} } = data ? data : {}
  return (
    <>
      <ClientForm client={client}></ClientForm>
    </>
  )
}
