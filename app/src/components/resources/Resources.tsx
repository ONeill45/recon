import React, { useState, useEffect } from 'react'
import { useLazyQuery } from '@apollo/client'
import { FaPlus } from 'react-icons/fa'

import styles from 'styles/Home.module.css'
import { Resource } from 'interfaces'
import { PageContainer } from 'components/common/PageContainer'
import { PageHeader } from 'components/common/PageHeader'
import { CardsContainer } from 'components/layouts/CardsContainer'
import { FilterPanel } from 'components/FilterPanel'
import { LinkButton } from 'components/common/Button'
import { ResourceCard } from 'components/resources/ResourceCard'
import { Pagination } from '../Pagination'

import {
  GET_RESOURCES,
  GET_ALL_CLIENTS_NAME,
  GET_ALL_PROJECTS_NAME,
  GET_DEPARTMENTS,
} from 'queries'

export const Resources: React.FC = () => {
  const page = 'Resources'
  const [searchText, setSearchText] = useState('')
  const [paginationInputs, setPaginationInputs] = useState<{
    page: number
    itemsPerPage: number
  }>({ page: 1, itemsPerPage: 10 })
  const [filter, setFilter] = useState({})
  const [isFilterClicked, setIsFilterClicked] = useState<boolean>(false)
  const [error, setError] = useState<{ [key: string]: any } | undefined>(
    undefined,
  )

  const [clients, setClients] = useState<Array<string>>([])
  const [projects, setProjects] = useState<Array<string>>([])
  const [departments, setDepartments] = useState<Array<string>>([])
  const [titles, setTitles] = useState<Array<string>>([])
  const [data, setData] = useState<{ [key: string]: any }>({})

  const [getAllResources, { loading }] = useLazyQuery(GET_RESOURCES, {
    fetchPolicy: 'network-only',
    onCompleted: (res: Array<{ [key: string]: any }>) => {
      const resValues = res && Object.values(res)[0]
      setData(resValues)
    },
    onError: (err: any) => {
      setError(err)
    },
  })

  const [getClients] = useLazyQuery(GET_ALL_CLIENTS_NAME, {
    fetchPolicy: 'network-only',
    onCompleted: (res: { [key: string]: any }) => {
      const _clients =
        res?.clients &&
        res.clients.map((item: { clientName: string }) => item.clientName)
      setClients(Array.from(new Set(_clients)))
    },
    onError: () => {},
  })

  const [getProjects] = useLazyQuery(GET_ALL_PROJECTS_NAME, {
    fetchPolicy: 'network-only',
    onCompleted: (res: { [key: string]: any }) => {
      const _projects =
        res?.projects &&
        res.projects.map((item: { projectName: string }) => item.projectName)
      setProjects(Array.from(new Set(_projects)))
    },
    onError: () => {},
  })

  const [getDepartments] = useLazyQuery(GET_DEPARTMENTS, {
    fetchPolicy: 'network-only',
    onCompleted: (res: { [key: string]: any }) => {
      const _departments =
        res?.departments &&
        res.departments.map((item: { name: string }) => item.name)
      setDepartments(Array.from(new Set(_departments)))
    },
    onError: () => {},
  })

  const [getResourceTitles] = useLazyQuery(GET_RESOURCES, {
    fetchPolicy: 'network-only',
    onCompleted: (res: { [key: string]: any }) => {
      const resValue = res && Object.values(res)[0]
      const _titles =
        resValue?.resources &&
        resValue.resources.map((item: { title: string }) => item.title)
      setTitles(Array.from(new Set(_titles)))
    },
    onError: () => {},
  })

  useEffect(() => {
    getClients({ variables: { searchItem: '' } })
    getProjects()
    getDepartments()
    getResourceTitles({ variables: { searchItem: '' } })
  }, [])

  useEffect(() => {
    handleOnFilter(
      { searchItem: searchText, pagination: paginationInputs },
      false,
    )
  }, [searchText, paginationInputs])

  useEffect(() => {
    setData({})
    setError(undefined)
    getAllResources({ variables: filter })
  }, [filter, getAllResources])

  const handleOnFilter = (queryFilter: any, filterClicked: boolean) => {
    setIsFilterClicked(filterClicked)
    if (!queryFilter.hasOwnProperty('searchItem')) {
      queryFilter['searchItem'] = searchText
    }
    if (!queryFilter.hasOwnProperty('pagination')) {
      queryFilter['pagination'] = paginationInputs
    }
    setFilter((prev: any) => {
      return filterClicked ? { ...queryFilter } : { ...prev, ...queryFilter }
    })
  }

  const { resources, count } = data

  if (error) {
    return <p>Error: {error.message}</p>
  } else if (data) {
    return (
      <PageContainer>
        <PageHeader headerText="Resources">
          <LinkButton href="/resources/resource" rightIcon={<FaPlus />}>
            Create
          </LinkButton>
          <FilterPanel
            setSearchText={setSearchText}
            page={page}
            onFilter={handleOnFilter}
            filterItems={{ clients, projects, departments, titles }}
          />
        </PageHeader>
        <div className={styles.container}>
          <CardsContainer>
            {resources &&
              resources.map((resource: Resource) => {
                return <ResourceCard resource={resource} key={resource.id} />
              })}
          </CardsContainer>
        </div>
        <Pagination
          filterClicked={isFilterClicked}
          searchText={searchText}
          setPaginationInputs={setPaginationInputs}
          total={count}
        />
      </PageContainer>
    )
  } else if (loading) {
    return <p>Loading...</p>
  } else {
    return <p></p>
  }
}
