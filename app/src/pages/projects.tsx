import { useEffect, useState } from 'react'
import axios from 'axios'

const GET_ALL_PROJECTS = `
{
  projects {
    id
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

const Projects = () => {
  const [projects, setProjects] = useState([])

  useEffect(() => {
    const getClients = async () => {
      const { data } = await axios.post('http://localhost:5000', {
        query: GET_ALL_PROJECTS,
      })
      setProjects(data.data.projects)
    }

    getClients()
  }, [])
  return <div></div>
}

export default Projects
