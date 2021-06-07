import { gql } from '@apollo/client'

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
    $projectTypes: [String!]
    $clientNames: [String!]
    $priorities: [String!]
    $confidence: String
    $startDate: DateInput
    $endDate: DateInput
  ) {
    projects(
      projectTypes: $projectTypes
      clientNames: $clientNames
      priorities: $priorities
      confidence: $confidence
      startDate: $startDate
      endDate: $endDate
    ) {
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
  }
`

export const GET_ALL_CLIENTS_NAME = gql`
  query clients($searchItem: String) {
    clients(searchItem: $searchItem) {
      clientName
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
