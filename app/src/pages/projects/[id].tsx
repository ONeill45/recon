import { gql, useQuery } from '@apollo/client'
import { useRouter } from 'next/router'

import { ProjectDetailCards, ProjectHeader } from 'components'

export const GET_PROJECT = gql`
  query GetProject($id: String!) {
    project(id: $id) {
      id
      projectName
      startDate
      endDate
      resourceAllocations {
        startDate
        endDate
        endReason
        percentage
        resource {
          firstName
          lastName
          preferredName
        }
      }
    }
  }
`

const Project = () => {
  const router = useRouter()
  const id = router.query.id

  const { data, loading, error } = useQuery(GET_PROJECT, {
    variables: {
      id,
    },
  })

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error?.message}</p>

  const { project } = data

  return (
    <>
      <ProjectHeader project={project} />
      <ProjectDetailCards project={project} />
    </>
  )
}

export default Project
