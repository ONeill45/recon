import { gql, useQuery } from '@apollo/client'

import { ProjectCard, PlusCircle, Cards } from 'components'
import { Project } from 'interfaces'

const GET_ALL_PROJECTS = gql`
  {
    projects {
      id
      projectName
      startDate
      endDate
      projectType
      priority
      confidence
      client {
        clientName
      }
    }
  }
`

const Projects = () => {
  const { data, loading, error } = useQuery(GET_ALL_PROJECTS, {
    fetchPolicy: 'network-only',
  })

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  const { projects } = data
  return (
    <>
      <Cards>
        <PlusCircle size={'50'} route={'/projects/new'} />
        {projects.map((project: Project) => {
          return <ProjectCard project={project} key={project.id} />
        })}
      </Cards>
    </>
  )
}

export default Projects
