import { gql, useQuery } from '@apollo/client'
import { useRouter } from 'next/router'

import { ResourceDetailCards, ResourceHeader } from 'components'

const GET_RESOURCE = gql`
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
        name
      }
      email
    }
  }
`

const Resource = () => {
  const router = useRouter()
  const { data, loading, error } = useQuery(GET_RESOURCE, {
    variables: {
      id: router.query.id,
    },
  })

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  const { resource } = data

  return (
    <>
      <ResourceHeader resource={resource} />
      <ResourceDetailCards resource={resource} />
    </>
  )
}

export default Resource