import { gql, useQuery } from '@apollo/client'
import { useRouter } from 'next/router'

import { ProjectForm } from '../../components/ProjectForm'

export const GET_PROJECT = gql`
  query GetProject($id: String!) {
    project(id: $id) {
      id
      projectName
      startDate
      endDate
      projectType
      confidence
      priority
      client {
        id
        clientName
      }
    }
  }
`

const Project = () => {

  const router = useRouter()
  const { id } = router.query

  const { data, loading, error } = useQuery(GET_PROJECT, {
    fetchPolicy: 'network-only',
    variables: { id },
    skip: !id,
  })

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  const { project } = data || {}

  return (
    <>
      <ProjectForm project={project} />
    </>
  )
}

export default Project
