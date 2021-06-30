import React, { useState, useEffect } from 'react'
import { useLazyQuery } from '@apollo/client'
import { FaPlus } from 'react-icons/fa'
import { Project, Priority, ProjectType } from 'interfaces'
import styles from 'styles/Home.module.css'
import { GET_PROJECTS, GET_ALL_CLIENTS_NAME } from 'queries'
import { PageContainer } from 'components/common/PageContainer'
import { CardsContainer } from 'components/layouts/CardsContainer'
import { FilterPanel } from 'components/FilterPanel'
import { LinkButton } from 'components/common/Button'
import { PageHeader } from 'components/common/PageHeader'
import { ProjectCard } from 'components/projects/ProjectCard'
import { Pagination } from 'components'

export const Projects: React.FC = () => {
  const [data, setData] = useState<{ [key: string]: any }>({})
  const [filter, setFilter] = useState({})
  const [error, setError] = useState<{ [key: string]: any } | undefined>(
    undefined,
  )
  const [paginationInputs, setPaginationInputs] = useState<{
    page: number
    itemsPerPage: number
  }>({ page: 1, itemsPerPage: 10 })
  const [isFilterClicked, setIsFilterClicked] = useState<boolean>(false)
  const [searchText, setSearchText] = useState('')
  const [clientNames, setClientNames] = useState<Array<string>>([])
  const [projectPriorities, setProjectPriorities] = useState<Array<string>>([])
  const [projectTypes, setProjectTypes] = useState<Array<string>>([])
  const projectConfidence: Array<string> = ['0', '100']

  const [getAllProjects, { loading }] = useLazyQuery(GET_PROJECTS, {
    fetchPolicy: 'network-only',
    onCompleted: (res: Array<{ [key: string]: any }>) => {
      const resValues = res && Object.values(res)[0]
      setData(resValues)
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
    handleOnFilter(
      { searchItem: searchText, pagination: paginationInputs },
      false,
    )
  }, [searchText, paginationInputs])

  useEffect(() => {
    setData({})
    setError(undefined)
    getAllProjects({ variables: filter })
  }, [filter, getAllProjects])

  const handleOnFilter = (
    queryFilter: Record<string, any>,
    filterClicked: boolean,
  ) => {
    setIsFilterClicked(filterClicked)
    if (!queryFilter['searchItem']) {
      queryFilter['searchItem'] = searchText
    }
    if (!queryFilter['pagination']) {
      queryFilter['pagination'] = paginationInputs
    }
    setFilter((prev: any) => {
      return filterClicked ? { ...queryFilter } : { ...prev, ...queryFilter }
    })
  }

  const { projects, count } = data

  const renderContent = () => {
    if (loading) {
      return <p>Loading...</p>
    } else if (error) {
      return <p>Error: {error?.message}</p>
    } else if (data) {
      return (
        <CardsContainer>
          {projects &&
            projects.map((project: Project) => {
              return <ProjectCard project={project} key={project.id} />
            })}
        </CardsContainer>
      )
    }

    return <p></p>
  }

  return (
    <PageContainer>
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
      <Pagination
        filterClicked={isFilterClicked}
        searchText={searchText}
        setPaginationInputs={setPaginationInputs}
        total={count}
      />
    </PageContainer>
  )
}
