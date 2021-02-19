import { ResourceCards, PlusCircle } from '../../components'
import { gql, useQuery } from '@apollo/client'

const GET_ALL_RESOURCES = gql`
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
      <PlusCircle size={'50'} route={'/resources/new'} />
      <ResourceCards resources={resources}></ResourceCards>
    </>
  )
}

export default Resources
