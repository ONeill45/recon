import { gql, useQuery } from '@apollo/client'
import { useRouter } from 'next/router'

import { ResourceDetailCards, ResourceHeader } from 'components'

const GET_RESOURCE = gql`
  query GetResource($id: String!) {
    resource(id: $id) {
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

const GET_RESOURCE_ALLOCATION = gql`
  query GetResourceAllocationByResourceId($resourceId: String!) {
    resourceAllocationByResourceId(resourceId: $resourceId) {
      id
      startDate
      endDate
      percentage
      project {
        id
        projectName
        projectType
        confidence
        priority
      }
      resource {
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
  }
`

const Resource = () => {
  const router = useRouter()
  const resourceId = router.query.id
  const queryMultiple = () => {
    const getResourceResponse = useQuery(GET_RESOURCE, {
      variables: {
        id: resourceId,
      },
    })
    const getResourceAllocationResponse = useQuery(GET_RESOURCE_ALLOCATION, {
      variables: {
        resourceId,
      },
    })
    return [getResourceResponse, getResourceAllocationResponse]
  }

  const [getResourceResponse, getResourceAllocationResponse] = queryMultiple()

  if (getResourceResponse.loading || getResourceAllocationResponse.loading)
    return <p>Loading...</p>
  if (getResourceResponse.error || getResourceAllocationResponse.error)
    return (
      <p>
        Error:{' '}
        {getResourceResponse.error?.message ||
          getResourceAllocationResponse.error?.message}
      </p>
    )

  const { resource } = getResourceResponse.data
  const { resourceAllocationByResourceId } = getResourceAllocationResponse.data

  return (
    <>
      <ResourceHeader resource={resource} />
      <ResourceDetailCards
        resource={resource}
        resourceAllocation={resourceAllocationByResourceId}
      />
    </>
  )
}

export default Resource
