import React from 'react'
import { gql, useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import { ResourceForm } from 'components'

export const GET_RESOURCE = gql`
  query GetResource($id: String!) {
    resource(id: $id) {
      id
      firstName
      lastName
      preferredName
      title
      startDate
      terminationDate
      imageUrl
      department {
        id
        name
      }
      email
      resourceAllocations {
        id
        startDate
        endDate
        endReason
        percentage
        project {
          id
          projectName
          projectType
          confidence
          priority
        }
      }
    }
  }
`

const Resource = () => {
  const router = useRouter()
  const { id } = router.query

  const { data, loading, error } = useQuery(GET_RESOURCE, {
    fetchPolicy: 'network-only',
    variables: { id },
    skip: !id,
  })

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  const { resource } = data || {}

  return (
    <>
      <ResourceForm resource={resource} />
    </>
  )
}

export default Resource
