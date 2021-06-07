import { useQuery } from '@apollo/client'
import { useRouter } from 'next/router'

import { GET_PROJECT } from 'queries'
import { ProjectHeader } from 'components/projects/ProjectHeader'
import { ProjectDetailCards } from 'components/projects/ProjectDetailCards'

const ProjectDetail: React.FC = () => {
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

export { ProjectDetail }
