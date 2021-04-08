import { gql, useQuery } from '@apollo/client'
import { useState } from 'react'
import { Cards, FilterPanel, PlusCircle, ResourceCard } from 'components'
import styles from '../../styles/Home.module.css'
import { Resource } from 'interfaces'
import Footer from 'components/Footer'

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

export const GET_SEARCHED_RESOURCES = gql`
query SearchResource($searchItem: String!) {
  searchResource(searchItem: $searchItem) {
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
  const { data, loading, error } = useQuery(GET_ALL_RESOURCES, {
    fetchPolicy: 'network-only',
  })

  const [searchText, setSearchText] = useState('')

  const searchQuery = useQuery(GET_SEARCHED_RESOURCES, {
    fetchPolicy: 'network-only',
    variables: {
      searchItem: searchText,
    },
  })

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  const { resources } = data

  return (
    <>
      <div className={styles.container}>
        <FilterPanel searchQuery={searchQuery} setSearchText={setSearchText} />
        <Cards>
          {resources.map((resource: Resource) => {
            return <ResourceCard resource={resource} key={resource.id} />
          })}
        </Cards>
        <PlusCircle size="50" route="/resources/new" />
      </div>
      <Footer />
    </>
  )
}

export default Resources
