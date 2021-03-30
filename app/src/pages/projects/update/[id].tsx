import { gql, useQuery } from '@apollo/client'
import { useRouter } from 'next/router'

import { ProjectForm } from '../../../components/ProjectForm'

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

const UpdateProject = () => {
  const router = useRouter()
  const { data, loading, error } = useQuery(GET_PROJECT, {
    variables: {
      id: router.query.id,
    },
  })

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  const { project } = data

  return (
    <>
      <ProjectForm project={project} />
    </>
  )
}

export default UpdateProject
