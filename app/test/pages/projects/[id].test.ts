import { gql } from '@apollo/client'
import Project from 'pages/projects/[id]'
import { ProjectFactory, ResourceFactory } from '../../factories'
import { applyMockUseRouter, render } from '../../testUtils'

const resources = ResourceFactory().buildList(5)
const project = ProjectFactory([
  { resource: resources[0], isCurrent: true },
  { resource: resources[1], isCurrent: true },
  { resource: resources[2], isCurrent: true },
  { resource: resources[3], isCurrent: true },
  { resource: resources[4], isCurrent: false },
]).build()

applyMockUseRouter({ query: { id: project.id } })

const mocks = [
  {
    request: {
      query: gql`
        query GetProject($id: String!) {
          project(id: $id) {
            id
            projectName
            startDate
            endDate
            resourceAllocations {
              id
              startDate
              endDate
              endReason
              percentage
              resource {
                firstName
                lastName
                preferredName
              }
            }
          }
        }
      `,
      variables: {
        id: project.id,
      },
    },
    result: {
      data: {
        project,
      },
    },
  },
]

const errorMocks = [
  {
    request: {
      query: gql`
        query GetProject($id: String!) {
          project(id: $id) {
            id
            projectName
            startDate
            endDate
            resourceAllocations {
              id
              startDate
              endDate
              endReason
              percentage
              resource {
                firstName
                lastName
                preferredName
              }
            }
          }
        }
      `,
      variables: {
        id: project.id,
      },
    },
    error: new Error('An error occurred'),
  },
]

describe('Individual project page test', () => {
  it('should render page for a single project and display Loading...', async () => {
    const { getByText } = await render(Project, {}, mocks, false)
    expect(getByText('Loading...')).toBeVisible()
  })
  it('should fetch the requested project and display more details', async () => {
    const { getByText } = await render(Project, {}, mocks)

    expect(getByText(`${project.projectName}`)).toBeVisible()
  })
  it('should show error message when an error occurs', async () => {
    const { getByText } = await render(Project, {}, errorMocks)

    expect(getByText('Error: An error occurred')).toBeVisible()
  })
})
