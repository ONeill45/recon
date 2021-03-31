import { gql, useQuery } from '@apollo/client'

import { Cards, PlusCircle, ResourceCard, FilterPanel } from 'components'
import Footer from 'components/Footer'
import { Resource } from 'interfaces'

import styles from '../../styles/Home.module.css'

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

const Resources = () => {
  const { data, loading, error } = useQuery(GET_ALL_RESOURCES, {
    fetchPolicy: 'network-only',
  })

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  const { resources } = data

  return (
    <>
      <div className={styles.container}>
        <FilterPanel />
        <Cards>
          {resources.map((resource: Resource) => {
            return <ResourceCard resource={resource} key={resource.id} />
          })}
        </Cards>
        <PlusCircle size={'50'} route={'/resources/new'} />
      </div>
      <Footer />
    </>
  )
}

export default Resources
