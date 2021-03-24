import { useRouter } from 'next/router'
import React from 'react'
import { gql, useMutation, useQuery } from '@apollo/client'
import styled from '@emotion/styled'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

import { useMsAccount } from 'utils/hooks'
import { Client, ProjectType, Project } from 'interfaces'
import { Priority } from '../interfaces/Enum'

const ProjectTypeValues = Object.entries(ProjectType).map((a) => a[1])
const PriorityValues = Object.entries(Priority).map((a) => a[1])

const CreateClientForm = styled.form`
  margin-top: 30px;
  padding-left: 35%;
`
const CreateClientFormLabel = styled.label`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px 0 10px 0;
`

const CreateProjectFormInput = styled.input`
  width: 50%;
  padding: 5px 10px;
  margin: 8px 0;
`

const CreateProjectFormInputSelect = styled.select`
  width: 50%;
  padding: 5px 10px;
  margin: 8px 0;
`

export const GET_ALL_CLIENTS = gql`
  query {
    clients {
      clientName
      id
    }
  }
`

export const CREATE_NEW_PROJECT = gql`
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

type ProjectProps = {
  project?: Project
}

export const ProjectForm = ({ project }: ProjectProps) => {
  const [projectName, setProjectName] = React.useState(
    project?.projectName || '',
  )
  const [client, setClient] = React.useState(project?.client || undefined)
  const [projectType, setProjectType] = React.useState<string>(
    project?.projectType || ProjectTypeValues[0],
  )
  const [priority, setPriority] = React.useState<string>(
    project?.priority || PriorityValues[0],
  )
  const [confidence, setConfidence] = React.useState(
    Number(project?.confidence || 50),
  )
  const [startDate, setStartDate] = React.useState(
    project?.startDate ? new Date(project.startDate) : new Date(),
  )
  const [endDate, setEndDate] = React.useState<Date | null>(
    project?.endDate ? new Date(project.endDate) : null,
  )
  const [hasMadeChanges, setHasMadeChanges] = React.useState(false)

  const router = useRouter()
  const account = useMsAccount()

  const [createProject] = useMutation(CREATE_NEW_PROJECT)
  const [updateProject] = useMutation(UPDATE_PROJECT)

  const handleClientInput = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setClient(clients.find((client: Client) => e.target.value === client.id).id)
  }

  const createNewProject = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!client) {
      alert('Client cannot be empty')
      return
    }
    const data = {
      projectName,
      client: client.id,
      startDate,
      endDate,
      projectType,
      priority,
      confidence,
      createdBy: account?.username,
      updatedBy: account?.username,
    }
    await createProject({
      variables: {
        data,
      },
    })
    router.push('/projects')
  }

  const updateExistingProject = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!client) {
      alert('Client cannot be empty')
      return
    }
    const data = {
      projectName,
      client: client.id,
      startDate,
      endDate,
      projectType,
      priority,
      confidence,
      updatedBy: account?.username,
    }
    await updateProject({
      variables: {
        id: project?.id,
        data,
      },
    })
  }

  const { data, error } = useQuery(GET_ALL_CLIENTS, {
    fetchPolicy: 'network-only',
  })

  const { clients = [] } = data || {}

  React.useEffect(() => {
    if (clients.length) {
      if (project) {
        const client = clients.find((c: Client) => c.id === project.client.id)
        setClient(client)
      } else {
        setClient(clients[0])
      }
    }
  }, [clients])

  if (project) {
    // update button should be disabled unless the user has made changes
    React.useEffect(() => {
      const client = clients.find((c: Client) => c.id === project.client.id)
      if (
        projectName !== project.projectName ||
        projectType !== project.projectType ||
        confidence !== project.confidence ||
        priority !== project.priority ||
        (client && client !== project.client) ||
        new Date(startDate).getTime() !==
          new Date(project.startDate).getTime() ||
        (endDate ? new Date(endDate).getTime() : null) !==
          (project?.endDate ? new Date(project.endDate).getTime() : null)
      ) {
        setHasMadeChanges(true)
      } else {
        setHasMadeChanges(false)
      }
    }, [
      projectName,
      startDate,
      endDate,
      client,
      projectType,
      confidence,
      priority,
    ])
  }

  if (error) return <p>Error: {error.message}</p>

  return (
    <>
      <CreateClientForm>
        <CreateClientFormLabel>
          Name
          <CreateProjectFormInput
            type="text"
            aria-label="project-name"
            onChange={(e) => setProjectName(e.target.value)}
            value={projectName}
          />
        </CreateClientFormLabel>
        <CreateClientFormLabel>
          Start Date
          <DatePicker
            selected={startDate}
            onChange={(date: Date) => setStartDate(date)}
          />
        </CreateClientFormLabel>
        <CreateClientFormLabel>
          End Date (Optional)
          <DatePicker
            selected={endDate}
            onChange={(date: Date) => setEndDate(date)}
          />
        </CreateClientFormLabel>
        <CreateClientFormLabel>
          Client
          <CreateProjectFormInputSelect
            value={client?.id}
            aria-label="client"
            onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
              handleClientInput(event)
            }
          >
            {clients.map((client: Client) => {
              return (
                <option key={client.id} value={client.id}>
                  {client.clientName}
                </option>
              )
            })}
          </CreateProjectFormInputSelect>
        </CreateClientFormLabel>
        <CreateClientFormLabel>
          Project Type
          <CreateProjectFormInputSelect
            value={projectType}
            onChange={(e) => setProjectType(e.target.value)}
            aria-label="project-type"
          >
            {ProjectTypeValues.map((projectType: ProjectType) => {
              return (
                <option key={projectType} value={projectType}>
                  {projectType}
                </option>
              )
            })}
          </CreateProjectFormInputSelect>
        </CreateClientFormLabel>
        <CreateClientFormLabel>
          Priority
          <CreateProjectFormInputSelect
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            aria-label="priority"
          >
            {PriorityValues.map((priorityValue: Priority) => {
              return (
                <option key={priorityValue} value={priorityValue}>
                  {priorityValue}
                </option>
              )
            })}
          </CreateProjectFormInputSelect>
        </CreateClientFormLabel>
        <CreateClientFormLabel>
          Confidence - {confidence}%
          <CreateProjectFormInput
            aria-label="confidence"
            type="range"
            value={confidence}
            min="0"
            max="100"
            onChange={(e) => setConfidence(Number(e.target.value))}
          />
        </CreateClientFormLabel>
        {project ? (
          <button
            name="Submit"
            onClick={updateExistingProject}
            disabled={hasMadeChanges ? false : true}
          >
            Update
          </button>
        ) : (
          <button name="Submit" onClick={createNewProject}>
            Submit
          </button>
        )}
      </CreateClientForm>
    </>
  )
}
