import { gql, useQuery } from '@apollo/client'
import { useState } from 'react'
import { Cards, FilterPanel, PlusCircle, ResourceCard } from 'components'
import styles from '../../styles/Home.module.css'
import { Resource } from 'interfaces'

export const GET_ALL_RESOURCES = gql`
  query Resources($searchItem: String!) {
    resources(searchItem: $searchItem) {
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
  const [searchText, setSearchText] = useState('')

  const { data, loading, error } = useQuery(GET_ALL_RESOURCES, {
    fetchPolicy: 'network-only',
    variables: {
      searchItem: searchText,
    },
  })

  const resources = data?.resources

  if (error) {
    return <p>Error: {error.message}</p>
  } else if (data) {
    return (
      <div className={styles.container}>
        <FilterPanel setSearchText={setSearchText} />
        <Cards>
          {resources?.map((resource: Resource) => {
            return <ResourceCard resource={resource} key={resource.id} />
          })}
        </Cards>
        <PlusCircle size={'50'} route={'/resources/resource'} />
      </div>
    )
  } else if (loading) {
    return <p>Loading...</p>
  } else {
    return
  }
}

export default Resources
