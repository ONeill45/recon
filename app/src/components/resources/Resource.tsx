import React from 'react'
import { useQuery } from '@apollo/client'
import { useRouter } from 'next/router'

import { ResourceForm } from 'components/resources/ResourceForm'
import { GET_RESOURCE } from 'queries'

export const Resource: React.FC = () => {
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

  return <ResourceForm resource={resource} />
}
