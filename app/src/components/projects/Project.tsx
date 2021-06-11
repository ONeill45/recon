import { useQuery } from '@apollo/client'
import { useRouter } from 'next/router'

import { GET_PROJECT } from 'queries'
import { ProjectForm } from 'components/projects/ProjectForm'

export const Project: React.FC = () => {
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
