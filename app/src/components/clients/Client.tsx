import React from 'react'
import { ClientForm } from 'components/clients/ClientForm'
import { useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import { GET_CLIENT_FROM_ID } from 'queries'

export const Client: React.FC = () => {
  const router = useRouter()
  const { id } = router.query

  const { data, loading, error } = useQuery(GET_CLIENT_FROM_ID, {
    fetchPolicy: 'network-only',
    variables: { id },
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
