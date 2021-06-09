import React from 'react'
import { useQuery } from '@apollo/client'
import { useRouter } from 'next/router'

import { ResourceDetailCards } from 'components/resources/ResourceDetailCards'
import { ResourceHeader } from 'components/resources/ResourceHeader'
import { GET_RESOURCE } from 'queries'

export const ResourceDetail: React.FC = () => {
  const router = useRouter()
  const id = router.query.id

  const { data, loading, error } = useQuery(GET_RESOURCE, {
    variables: {
      id,
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
