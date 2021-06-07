import React, { useState, useEffect } from 'react'
import { gql, useLazyQuery } from '@apollo/client'
import { ProjectCard, PlusCircle, Cards, FilterPanel } from 'components'
import { Project, Priority, ProjectType } from 'interfaces'
import styles from '../../styles/Home.module.css'

export const GET_PROJECTS = gql`
  query GetAllProjects(
    $searchItem: String
    $projectTypes: [String!]
    $clientNames: [String!]
    $priorities: [String!]
    $confidence: String
    $startDate: DateInput
    $endDate: DateInput
  ) {
    projects(
      searchItem: $searchItem
      projectTypes: $projectTypes
      clientNames: $clientNames
      priorities: $priorities
      confidence: $confidence
      startDate: $startDate
      endDate: $endDate
    ) {
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

export const GET_ALL_CLIENTS_NAME = gql`
  query clients($searchItem: String) {
    clients(searchItem: $searchItem) {
      clientName
    }
  }
`

const Projects = () => {
  const page = 'Projects'
  const [searchText, setSearchText] = useState('')
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

  useEffect(() => {
    handleOnFilter({ searchItem: searchText })
  }, [searchText])

  useEffect(() => {
    setData({})
    setError(undefined)
    getAllProjects({ variables: filter })
  }, [filter, getAllProjects])

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  const handleOnFilter = (queryFilter: any) => {
    if (!queryFilter.hasOwnProperty('searchItem')) {
      queryFilter['searchItem'] = searchText
    }
    setFilter((prev: any) => {
      if (prev.searchItem !== queryFilter.searchItem) {
        return { ...prev, ...queryFilter }
      } else {
        return { ...queryFilter }
      }
    })
  }
  const { projects } = data

  return (
    <>
      <div className={styles.container}>
        <FilterPanel
          setSearchText={setSearchText}
          page={page}
          onFilter={handleOnFilter}
          filterItems={{
            clientNames,
            projectConfidence,
            projectPriorities,
            projectTypes,
          }}
        />
        <Cards>
          {projects &&
            projects.map((project: Project) => {
              return <ProjectCard project={project} key={project.id} />
            })}
        </Cards>
        <PlusCircle size="50" route="/projects/project" />
      </div>
    </>
  )
}

export default Projects
