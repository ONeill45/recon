import React, { useState, useEffect } from 'react'
import { useLazyQuery } from '@apollo/client'
import { FaPlus } from 'react-icons/fa'
import { Project, Priority, ProjectType } from 'interfaces'
import styles from 'styles/Home.module.css'
import { GET_PROJECTS, GET_ALL_CLIENTS_NAME } from 'queries'
import { CardsContainer } from 'components/layouts/CardsContainer'
import { FilterPanel } from 'components/FilterPanel'
import { LinkButton } from 'components/common/Button'
import { PageHeader } from 'components/common/PageHeader'
import { ProjectCard } from 'components/projects/ProjectCard'

export const Projects: React.FC = () => {
  const [filter, setFilter] = useState({})
  const [error, setError] = useState<{ [key: string]: any } | undefined>(
    undefined,
  )
  const [searchText, setSearchText] = useState('')
  const [clientNames, setClientNames] = useState<Array<string>>([])
  const [projectPriorities, setProjectPriorities] = useState<Array<string>>([])
  const [projectTypes, setProjectTypes] = useState<Array<string>>([])
  const projectConfidence: Array<string> = ['0', '100']

  const [getAllProjects, { loading = true, data }] = useLazyQuery(
    GET_PROJECTS,
    {
      fetchPolicy: 'network-only',
      onError: (err: any) => {
        setError(err)
      },
    },
  )

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
    handleOnFilter({ searchItem: searchText })
  }, [searchText])

  useEffect(() => {
    getAllProjects({ variables: filter })
  }, [filter, getAllProjects])

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

  const projects = data?.projects

  const renderContent = () => {
    if (loading || (!data && !error)) {
      return <p>Loading...</p>
    } else if (data) {
      return (
        <CardsContainer>
          {projects &&
            projects.map((project: Project) => {
              return <ProjectCard project={project} key={project.id} />
            })}
        </CardsContainer>
      )
    } else if (error) {
      return <p>Error: {error.message}</p>
    }

    return <p></p>
  }

  return (
    <>
      <PageHeader headerText="Projects">
        <LinkButton href="/projects/project" rightIcon={<FaPlus />}>
          Create
        </LinkButton>
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
      </PageHeader>
      <div className={styles.container}>{renderContent()}</div>
    </>
  )
}
