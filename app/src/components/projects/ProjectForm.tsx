import { useRouter } from 'next/router'
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { gql, useMutation, useQuery } from '@apollo/client'
import styled from '@emotion/styled'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { validateMutationParams } from 'utils/functions'
import { useMsAccount } from 'utils/hooks'
import { Client, ProjectType, Project } from 'interfaces'
import { Priority } from 'interfaces/Enum'
import { Toast } from 'components/common/Toast'
import { useToast } from 'utils/hooks'
import { CREATE_PROJECT, UPDATE_PROJECT } from 'queries'

const ProjectTypeValues = Object.entries(ProjectType).map((a) => a[1])
const PriorityValues = Object.entries(Priority).map((a) => a[1])

const CreateProjectForm = styled.form`
  margin: 1rem 0;
  padding-left: 35%;
`
const CreateProjectFormLabel = styled.label`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0.6rem 0;
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

const SubmitButton = styled.button`
  display: block;
  margin-top: 1rem;
`

export const GET_ALL_CLIENTS = gql`
  query {
    clients {
      clientName
      id
    }
  }
`

type ProjectProps = {
  project?: Project
}

export const ProjectForm: React.FC<ProjectProps> = ({ project }) => {
  const [projectName, setProjectName] = useState(project?.projectName || '')
  const [client, setClient] = useState(project?.client || undefined)
  const [projectType, setProjectType] = useState<string>(
    project?.projectType || ProjectTypeValues[0],
  )
  const [priority, setPriority] = useState<string>(
    project?.priority || PriorityValues[0],
  )
  const [confidence, setConfidence] = useState(
    Number(project?.confidence || 50),
  )
  const [startDate, setStartDate] = useState(
    project?.startDate ? new Date(project.startDate) : new Date(),
  )
  const [endDate, setEndDate] = useState<Date | null>(
    project?.endDate ? new Date(project.endDate) : null,
  )
  const [hasMadeChanges, setHasFormChanged] = useState(false)

  const router = useRouter()
  const account = useMsAccount()

  const [createProject] = useMutation(CREATE_PROJECT)
  const [updateProject] = useMutation(UPDATE_PROJECT)

  const {
    setDisplayToast,
    setToastHeader,
    setUpdateSuccess,
    displayToast,
    toastHeader,
    updateSuccess,
    toastFields,
    setToastFields,
  } = useToast()

  const handleClientInput = (e: ChangeEvent<HTMLSelectElement>) => {
    setClient(clients.find((client: Client) => e.target.value === client.id))
  }

  const createNewProject = async (e: FormEvent) => {
    e.preventDefault()

    if (!client) {
      alert('Client cannot be empty')
      return
    }

    const mutationVariables = {
      projectName,
      clientId: client.id,
      startDate,
      endDate,
      projectType,
      priority,
      confidence,
      createdBy: account?.username,
      updatedBy: account?.username,
    }

    const mutationParams = [
      {
        projectName: projectName,
        displayText: 'Project name',
      },
      {
        clientId: client.id,
        displayText: 'Client name',
      },
      {
        startDate: startDate,
        displayText: 'Start date',
      },
      {
        projectType: projectType,
        displayText: 'Project type',
      },
      {
        priority: priority,
        displayText: 'Priority',
      },
      {
        confidence: confidence,
        displayText: 'Confidence',
      },
    ]

    const toastFuncs = {
      setDisplayToast,
      setToastHeader,
      setUpdateSuccess,
      setToastFields,
    }

    const isMutationVarNull = validateMutationParams(mutationParams, toastFuncs)

    if (!isMutationVarNull) {
      try {
        const { data } = await createProject({
          variables: {
            data: mutationVariables,
          },
        })

        if (data) {
          setToastHeader('Successfully created Project!')
          setToastFields([])
          setUpdateSuccess(true)
          setDisplayToast(true)
          setTimeout(() => {
            router.push('/projects')
          }, 3000)
        }
      } catch {
        setToastHeader('Oops! Something went wrong.')
        setToastFields([])
        setUpdateSuccess(false)
        setDisplayToast(true)
      }
    }
  }

  const updateExistingProject = async (e: FormEvent) => {
    e.preventDefault()
    if (!client) {
      alert('Client cannot be empty')
      return
    }
    const mutationVariables = {
      projectName,
      clientId: client.id,
      startDate,
      endDate,
      projectType,
      priority,
      confidence,
      updatedBy: account?.username,
    }

    const mutationParams = [
      {
        projectName: projectName,
        displayText: 'Project name',
      },
      {
        clientId: client.id,
        displayText: 'Client name',
      },
      {
        startDate: startDate,
        displayText: 'Start date',
      },
      {
        projectType: projectType,
        displayText: 'Project type',
      },
      {
        priority: priority,
        displayText: 'Priority',
      },
      {
        confidence: confidence,
        displayText: 'Confidence',
      },
    ]

    const toastFuncs = {
      setDisplayToast,
      setToastHeader,
      setUpdateSuccess,
      setToastFields,
    }

    const isMutationVarNull = validateMutationParams(mutationParams, toastFuncs)

    if (!isMutationVarNull) {
      try {
        const { data } = await updateProject({
          variables: {
            id: project?.id,
            data: mutationVariables,
          },
        })

        if (data) {
          setToastHeader('Successfully updated Project!')
          setToastFields([])
          setUpdateSuccess(true)
          setDisplayToast(true)
        }
      } catch {
        setToastHeader('Oops! Something went wrong.')
        setToastFields([])
        setUpdateSuccess(false)
        setDisplayToast(true)
      }
    }
  }

  const { data, error } = useQuery(GET_ALL_CLIENTS, {
    fetchPolicy: 'network-only',
  })

  const { clients = [] } = data || {}

  useEffect(() => {
    if (clients.length) {
      if (project) {
        const client = clients.find((c: Client) => c.id === project.client.id)
        setClient(client)
      } else {
        setClient(clients[0])
      }
    }
  }, [clients])

  // Added these effects for detecting changes on the date
  // pickers since they do not trigger a change event on the
  // <CreateProjectForm> component when they are modified
  useEffect(() => {
    setHasFormChanged(true)
  }, [startDate, endDate])

  useEffect(() => {
    setHasFormChanged(false)
  }, [])

  const formChange = () => {
    setHasFormChanged(true)
  }

  if (error) return <p>Error: {error.message}</p>

  return (
    <>
      <Toast
        headerText={toastHeader}
        fields={toastFields}
        success={updateSuccess}
        display={displayToast}
        setDisplayToast={setDisplayToast}
      />
      <CreateProjectForm onChange={formChange}>
        <CreateProjectFormLabel>
          Name
          <CreateProjectFormInput
            type="text"
            aria-label="project-name"
            onChange={(e: FormEvent<HTMLInputElement>) =>
              setProjectName(e.currentTarget.value)
            }
            value={projectName}
          />
        </CreateProjectFormLabel>
        <CreateProjectFormLabel>
          Start Date
          <DatePicker
            selected={startDate}
            onChange={(date: Date) => setStartDate(date)}
          />
        </CreateProjectFormLabel>
        <CreateProjectFormLabel>
          End Date (Optional)
          <DatePicker
            selected={endDate}
            onChange={(date: Date) => setEndDate(date)}
          />
        </CreateProjectFormLabel>
        <CreateProjectFormLabel>
          Client
          <CreateProjectFormInputSelect
            value={client?.id}
            aria-label="client"
            onChange={(event: ChangeEvent<HTMLSelectElement>) =>
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
        </CreateProjectFormLabel>
        <CreateProjectFormLabel>
          Project Type
          <CreateProjectFormInputSelect
            value={projectType}
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              setProjectType(e.target.value)
            }
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
        </CreateProjectFormLabel>
        <CreateProjectFormLabel>
          Priority
          <CreateProjectFormInputSelect
            value={priority}
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              setPriority(e.target.value)
            }
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
        </CreateProjectFormLabel>
        <CreateProjectFormLabel>
          Confidence - {confidence}%
          <CreateProjectFormInput
            aria-label="confidence"
            type="range"
            value={confidence}
            min="0"
            max="100"
            onChange={(e: FormEvent<HTMLInputElement>) =>
              setConfidence(Number(e.currentTarget.value))
            }
          />
        </CreateProjectFormLabel>
        {project ? (
          <SubmitButton
            name="Submit"
            onClick={updateExistingProject}
            disabled={!hasMadeChanges}
          >
            Update
          </SubmitButton>
        ) : (
          <SubmitButton name="Submit" onClick={createNewProject}>
            Submit
          </SubmitButton>
        )}
      </CreateProjectForm>
    </>
  )
}