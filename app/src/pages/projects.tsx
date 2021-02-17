import { useEffect, useState } from 'react'
import axios from 'axios'
import styled from '@emotion/styled'
import { ProjectCard } from '../components'
import { Project } from 'interfaces'

const GET_ALL_PROJECTS = `
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
      logoUrl
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
  const [projects, setProjects] = useState([])

  useEffect(() => {
    const getProjects = async () => {
      const { data } = await axios.post('http://localhost:5000', {
        query: GET_ALL_PROJECTS,
      })
      setProjects(data.data.projects)
    }

    getProjects()
  }, [])
  return (
    <CardsDiv>
      {projects.map((project: Project) => {
        return <ProjectCard project={project} key={project.id} />
      })}
    </CardsDiv>
  )
}

export default Projects
