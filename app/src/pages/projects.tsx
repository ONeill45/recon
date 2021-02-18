import { gql, useQuery } from '@apollo/client'
import styled from '@emotion/styled'

import { ProjectCard, PlusCircle } from '../components'
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
const CardsDiv = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
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
      <PlusCircle size={'50'} route={'/projects'} />
      <CardsDiv>
        {projects.map((project: Project) => {
          return <ProjectCard project={project} key={project.id} />
        })}
      </CardsDiv>
    </>
  )
}

export default Projects
