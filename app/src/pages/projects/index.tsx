import { gql, useQuery } from '@apollo/client'

import { ProjectCard, PlusCircle, Cards, FilterPanel } from 'components'
import { Project } from 'interfaces'

import styles from '../../styles/Home.module.css'

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
      <div className={styles.container}>
        <FilterPanel />
        <Cards>
          {projects.map((project: Project) => {
            return <ProjectCard project={project} key={project.id} />
          })}
        </Cards>
        <PlusCircle size="50" route="/projects/project" />
      </div>
    </>
  )
}

export default Projects
