import React, { useState, useEffect } from 'react'
import { gql, useLazyQuery } from '@apollo/client'

import { Cards, FilterPanel, PlusCircle, ResourceCard } from 'components'
import styles from '../../styles/Home.module.css'
import { Resource } from 'interfaces'

export const GET_ALL_RESOURCES = gql`
  {
    resources {
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

export const GET_RESOURCES = gql`
  query GetAllResource($title: String, $startDate: String, $terminationDate: String, $clients: String, $skills: String, $departmentName: String, $project: String) {
    resources(title: $title, startDate: $startDate, terminationDate: $terminationDate, clients: $clients, skills: $skills, departmentName: $departmentName, project: $project) {
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

const Resources = () => {
  const [filter, setFilter] = useState({})
  const [error, setError] = useState(null)
  const [data, setData] = useState({})
  // const { data, loading, error } = useQuery(GET_ALL_RESOURCES, {
  //   fetchPolicy: 'network-only',
  // })
  const [getAllResources, { loading }] = useLazyQuery(GET_RESOURCES, {
    fetchPolicy: 'network-only',
    onCompleted: (res: Array<{[key: string]: any}>) => {setData(res)},
    onError: (err: any) => {setError(err)}
  })

  const page = 'Resources'

  useEffect(() => {
    setData({}) 
    setError(null)
    getAllResources({variables: filter})
  }, [filter, getAllResources])

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  const handleOnFilter = (queryFilter: any) => {
    setFilter(queryFilter)
  }

  const { resources } = data

  return (
    <>
      <div className={styles.container}>
        <FilterPanel page={page} onFilter={handleOnFilter} />
        <Cards>
          {resources && resources.map((resource: Resource) => {
            return <ResourceCard resource={resource} key={resource.id} />
          })}
        </Cards>
        <PlusCircle size={'50'} route={'/resources/resource'} />
      </div>
    </>
  )
}

export default Resources
