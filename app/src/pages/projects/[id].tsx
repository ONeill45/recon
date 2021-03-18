import { gql, useQuery } from '@apollo/client'
import { useRouter } from 'next/router'

import { ProjectDetailCards, ProjectHeader } from 'components'
import { GET_ALL_RESOURCES } from 'pages/resources'

export const GET_PROJECT = gql`
  query GetProject($id: String!) {
    project(id: $id) {
      id
      projectName
      startDate
      endDate
    }
  }
`

const Project = () => {
  const router = useRouter()
  const { data, loading, error } = useQuery(GET_PROJECT, {
    variables: {
      id: router.query.id,
    },
  })

  const {
    data: resourceData,
    loading: resourceLoading,
    error: resourceError,
  } = useQuery(GET_ALL_RESOURCES, {
    fetchPolicy: 'network-only',
  })

  if (loading || resourceLoading) return <p>Loading...</p>
  if (error || resourceError)
    return <p>Error: {error?.message || resourceError?.message}</p>

  const { project } = data
  const { resources } = resourceData

  return (
    <>
      <ProjectHeader project={project} />
      <ProjectDetailCards project={project} resources={resources} />
    </>
  )
}

export default Project
