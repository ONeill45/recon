import React from 'react'
import { NewClientForm } from 'components'
import { gql, useQuery } from '@apollo/client'
import { useRouter } from 'next/router'

const GET_CLIENT_FROM_ID = gql`
  query GetClient($id: String!){
    client(id: $id){
      id
      clientName
      description
      logoUrl
      startDate
      endDate
    }
  }
`
const NewClient = () => {
  const router = useRouter()
  const { id } = router.query; 
  
  // if (id)
  // {
  console.log('Client Id received...' + id)
  
  const { data, loading, error } = useQuery(GET_CLIENT_FROM_ID, {
    fetchPolicy: 'network-only',
    variables: { id: id },
  })

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  const client = data
  // }
  // else{
  //   client = undefined
  // }
  return (
    <>
      <NewClientForm client={client}></NewClientForm>
    </>
  )
}

export default NewClient
