import { gql } from '@apollo/client'

/**
 * Project queries
 */
export const GET_PROJECT = gql`
  query GetProject($id: String!) {
    project(id: $id) {
      id
      projectName
      startDate
      endDate
      projectType
      confidence
      priority
      client {
        id
        clientName
      }
    }
  }
`

export const GET_PROJECTS = gql`
  query GetAllProjects(
    $searchItem: String
    $projectTypes: [String!]
    $clientNames: [String!]
    $priorities: [String!]
    $confidence: String
    $startDate: DateInput
    $endDate: DateInput
    $pagination: PaginationInput
  ) {
    projects(
      searchItem: $searchItem
      projectTypes: $projectTypes
      clientNames: $clientNames
      priorities: $priorities
      confidence: $confidence
      startDate: $startDate
      endDate: $endDate
      pagination: $pagination
    ) {
      projects {
        id
        projectName
        startDate
        endDate
        projectType
        priority
        confidence
        client {
          clientName
        }
      }
      count
    }
  }
`

export const CREATE_PROJECT = gql`
  mutation CreateProject($data: CreateProjectInput!) {
    createProject(data: $data) {
      id
    }
  }
`

export const UPDATE_PROJECT = gql`
  mutation updateProject($id: String!, $data: UpdateProjectInput!) {
    updateProject(id: $id, data: $data) {
      id
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

/**
 * Client queries
 */
export const CREATE_CLIENT = gql`
  mutation CreateClient($data: CreateClientInput!) {
    createClient(data: $data) {
      id
    }
  }
`
export const UPDATE_CLIENT = gql`
  mutation UpdateClient($id: String!, $data: UpdateClientInput!) {
    updateClient(id: $id, data: $data) {
      id
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
export const GET_CLIENT_FROM_ID = gql`
  query GetClient($id: String!) {
    client(id: $id) {
      id
      clientName
      description
      logoUrl
      startDate
      endDate
    }
  }
`
export const GET_ALL_CLIENTS = gql`
  query clients($searchItem: String) {
    clients(searchItem: $searchItem) {
      id
      clientName
      description
      logoUrl
      startDate
      endDate
    }
  }
`

/**
 * Resource queries
 */

export const GET_RESOURCES = gql`
  query GetAllResource(
    $searchItem: String
    $title: [String!]
    $clients: [String!]
    $departmentName: [String!]
    $project: [String!]
    $startDate: DateInput
    $endDate: DateInput
    $pagination: PaginationInput
  ) {
    resources(
      searchItem: $searchItem
      title: $title
      startDate: $startDate
      endDate: $endDate
      clients: $clients
      departmentName: $departmentName
      project: $project
      pagination: $pagination
    ) {
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
      count
    }
  }
`

export const GET_RESOURCE = gql`
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
        id
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

export const GET_DEPARTMENTS = gql`
  {
    departments {
      id
      name
    }
  }
`

export const CREATE_RESOURCE = gql`
  mutation CreateResource($data: CreateResourceInput!) {
    createResource(data: $data) {
      id
    }
  }
`

export const UPDATE_RESOURCE = gql`
  mutation UpdateResource($id: String!, $data: UpdateResourceInput!) {
    updateResource(id: $id, data: $data) {
      id
    }
  }
`
