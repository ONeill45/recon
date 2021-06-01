import React, { useState, useEffect } from 'react'
import { gql, useLazyQuery } from '@apollo/client'
import { Cards, FilterPanel, PlusCircle, ResourceCard } from 'components'
import styles from '../../styles/Home.module.css'
import { Resource } from 'interfaces'

export const GET_RESOURCES = gql`
  query GetAllResource(
    $searchItem: String
    $title: [String!]
    $clients: [String!]
    $departmentName: [String!]
    $project: [String!]
    $startDate: DateInput
    $endDate: DateInput
  ) {
    resources(
      searchItem: $searchItem
      title: $title
      startDate: $startDate
      endDate: $endDate
      clients: $clients
      departmentName: $departmentName
      project: $project
    ) {
      id
      firstName
      lastName
      preferredName
      title
      startDate
      terminationDate
      imageUrl
      department {
        name
      }
      email
      resourceAllocations {
        id
        startDate
        endDate
        endReason
        percentage
        project {
          id
          projectName
          projectType
          confidence
          priority
        }
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

export const GET_ALL_PROJECTS_NAME = gql`
  {
    projects {
      projectName
    }
  }
`

export const GET_ALL_DEPARTMENTS_NAME = gql`
  {
    departments {
      name
    }
  }
`

export const GET_ALL_RESOURCE_TITLE = gql`
  {
    resources {
      title
    }
  }
`

const MockSkills = [
  'React',
  'React Native',
  'Vue',
  'Angular',
  'IONIC',
  'Node',
  'Ruby on Rails',
  'CI/CD with Jenkins',
  'AWS',
]
const Resources = () => {
  const page = 'Resources'
  const [searchText, setSearchText] = useState('')
  const [filter, setFilter] = useState({})
  const [error, setError] = useState<{ [key: string]: any } | undefined>(
    undefined,
  )

  const [clients, setClients] = useState<Array<string>>([])
  const [projects, setProjects] = useState<Array<string>>([])
  const [departments, setDepartments] = useState<Array<string>>([])
  const [titles, setTitles] = useState<Array<string>>([])
  const [skills, setSkills] = useState<Array<string>>([])
  const [data, setData] = useState<{ [key: string]: any }>({})

  const [getAllResources, { loading }] = useLazyQuery(GET_RESOURCES, {
    fetchPolicy: 'network-only',
    onCompleted: (res: Array<{ [key: string]: any }>) => {
      setData(res)
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

  const [getDepartments] = useLazyQuery(GET_ALL_DEPARTMENTS_NAME, {
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
      const _titles =
        res?.resources &&
        res.resources.map((item: { title: string }) => item.title)
      setTitles(Array.from(new Set(_titles)))
    },
    onError: () => {},
  })

  useEffect(() => {
    getClients({ variables: { searchItem: '' } })
    getProjects()
    getDepartments()
    getResourceTitles({ variables: { searchItem: '' } })
    setSkills(MockSkills)
  }, [])

  useEffect(() => {
    handleOnFilter({ searchItem: searchText })
  }, [searchText])

  useEffect(() => {
    setData({})
    setError(undefined)
    getAllResources({ variables: filter })
  }, [filter, getAllResources])

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

  const { resources } = data

  if (error) {
    return <p>Error: {error.message}</p>
  } else if (data) {
    return (
      <div className={styles.container}>
        <FilterPanel
          setSearchText={setSearchText}
          page={page}
          onFilter={handleOnFilter}
          filterItems={{ clients, projects, departments, titles, skills }}
        />
        <Cards>
          {resources &&
            resources.map((resource: Resource) => {
              return <ResourceCard resource={resource} key={resource.id} />
            })}
        </Cards>
        <PlusCircle size={'50'} route={'/resources/resource'} />
      </div>
    )
  } else if (loading) {
    return <p>Loading...</p>
  } else {
    return <p></p>
  }
}

export default Resources
