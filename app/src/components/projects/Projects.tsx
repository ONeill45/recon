import React, { useState, useEffect } from 'react'
import { useLazyQuery } from '@apollo/client'
import { FaPlus } from 'react-icons/fa'
import { Project, Priority, ProjectType } from 'interfaces'
import styles from 'styles/Home.module.css'
import { GET_PROJECTS, GET_ALL_CLIENTS_NAME } from 'queries'
import { CardsContainer } from 'components/CardsContainer'
import { FilterPanel } from 'components/FilterPanel'
import { LinkButton } from 'components/Button'
import { PageHeader } from 'components/PageHeader'
import { ProjectCard } from 'components/projects/ProjectCard'

const Projects: React.FC = () => {
  const [filter, setFilter] = useState({})
  const [error, setError] = useState<{ [key: string]: any } | undefined>(
    undefined,
  )

  const [clientNames, setClientNames] = useState<Array<string>>([])
  const [projectPriorities, setProjectPriorities] = useState<Array<string>>([])
  const [projectTypes, setProjectTypes] = useState<Array<string>>([])
  const projectConfidence: Array<string> = ['0', '100']

  const [data, setData] = useState<{ [key: string]: any }>({})

  const [getAllProjects, { loading }] = useLazyQuery(GET_PROJECTS, {
    fetchPolicy: 'network-only',
    onCompleted: (res: Array<{ [key: string]: any }>) => {
      setData(res)
    },
    onError: (err: any) => {
      setError(err)
    },
  })

  const [getClientNames] = useLazyQuery(GET_ALL_CLIENTS_NAME, {
    fetchPolicy: 'network-only',
    onCompleted: (res: { [key: string]: any }) => {
      const _clients =
        res?.clients &&
        res.clients.map((item: { clientName: string }) => item.clientName)
      setClientNames(Array.from(new Set(_clients)))
    },
    onError: () => {},
  })

  const getProjectPriorites = () => {
    const values = Object.values(Priority).map((value: any) => {
      return value
    })
    setProjectPriorities(values)
  }

  const getProjectTypes = () => {
    const values = Object.values(ProjectType).map((value: any) => {
      return value
    })
    setProjectTypes(values)
  }

  useEffect(() => {
    getClientNames({ variables: { searchItem: '' } })
    getProjectPriorites()
    getProjectTypes()
  }, [])

  const page = 'Projects'

  useEffect(() => {
    setData({})
    setError(undefined)
    getAllProjects({ variables: filter })
  }, [filter, getAllProjects])

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  const handleOnFilter = (queryFilter: any) => {
    setFilter(queryFilter)
  }

  const { projects } = data

  return (
    <>
      <PageHeader headerText="Projects">
        <LinkButton href="/projects/project" rightIcon={<FaPlus />}>
          Create
        </LinkButton>
        <FilterPanel
          page={page}
          onFilter={handleOnFilter}
          filterItems={{
            clientNames,
            projectConfidence,
            projectPriorities,
            projectTypes,
          }}
        />
      </PageHeader>
      <div className={styles.container}>
        <CardsContainer>
          {projects &&
            projects.map((project: Project) => {
              return <ProjectCard project={project} key={project.id} />
            })}
        </CardsContainer>
      </div>
    </>
  )
}

export { Projects }
