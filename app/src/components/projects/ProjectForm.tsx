import { useRouter } from 'next/router'
import React from 'react'
import { gql, useMutation, useQuery } from '@apollo/client'
import { useFormik } from 'formik'
import * as yup from 'yup'
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
} from '@chakra-ui/react'

import { useMsAccount } from 'utils/hooks'
import { Client, ProjectType, Project } from 'interfaces'
import { Priority } from 'interfaces/Enum'
import { CREATE_PROJECT, UPDATE_PROJECT } from 'queries'
import { displayToast } from '../../utils/toast'
import { DatePicker } from '../common/forms/Datepicker'
import { FormContainer } from '../common/forms/FormContainer'

const ProjectTypeValues = Object.entries(ProjectType).map((a) => a[1])
const PriorityValues = Object.entries(Priority).map((a) => a[1])

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

type ProjectFormValues = {
  endDate: Date | undefined
  clientId: string
} & Omit<
  Project,
  | 'id'
  | 'endDate'
  | 'createdBy'
  | 'createdDate'
  | 'updatedBy'
  | 'updatedDate'
  | 'deletedBy'
  | 'deletedDate'
  | 'client'
  | 'resourceAllocations'
>

const validationSchema = yup
  .object()
  .shape<Record<keyof ProjectFormValues, yup.AnySchema>>({
    projectName: yup.string().required('Project Name is required'),
    clientId: yup.string().required('Description is required'),
    projectType: yup.string().required('Project Type is required'),
    priority: yup.string().required('Priority is required'),
    confidence: yup.number().required('Project Type is required'),
    startDate: yup.date().required('Start date is required'),
    endDate: yup.date().optional(),
  })

export const ProjectForm: React.FC<ProjectProps> = ({ project }) => {
  const {
    values,
    setFieldValue,
    handleSubmit,
    handleChange,
    errors,
    touched,
    dirty,
    isSubmitting,
    setSubmitting,
    resetForm,
  } = useFormik<ProjectFormValues>({
    initialValues: {
      projectName: project?.projectName ?? '',
      clientId: project?.client?.id ?? '',
      projectType: project?.projectType ?? ProjectTypeValues[0],
      priority: project?.priority ?? PriorityValues[0],
      confidence: project?.confidence ?? 0,
      startDate: project?.startDate ? new Date(project.startDate) : new Date(),
      endDate: project?.endDate ? new Date(project.endDate) : undefined,
    },
    validationSchema,
    onSubmit: (values) => {
      if (project?.id) {
        updateExistingProject(values)
      } else {
        createNewProject(values)
      }
      setSubmitting(false)
    },
  })

  const router = useRouter()
  const account = useMsAccount()

  const [createProject] = useMutation(CREATE_PROJECT)
  const [updateProject] = useMutation(UPDATE_PROJECT)

  const createNewProject = async ({
    projectName,
    clientId,
    projectType,
    priority,
    confidence,
    startDate,
    endDate,
  }: ProjectFormValues) => {
    const mutationVariables = {
      projectName,
      clientId,
      startDate,
      endDate,
      projectType,
      priority,
      confidence,
      createdBy: account?.username,
      updatedBy: account?.username,
    }

    try {
      const { data } = await createProject({
        variables: {
          data: mutationVariables,
        },
      })

      if (data) {
        displayToast({
          title: 'Project Created!',
        })
        setTimeout(() => {
          router.push('/projects')
        }, 3000)
      }
    } catch {
      displayToast({
        title: 'Oops! Something went wrong.',
        status: 'error',
      })
    }
  }

  const updateExistingProject = async ({
    projectName,
    clientId,
    projectType,
    priority,
    confidence,
    startDate,
    endDate,
  }: ProjectFormValues) => {
    const mutationVariables = {
      projectName,
      clientId,
      startDate,
      endDate,
      projectType,
      priority,
      confidence,
      updatedBy: account?.username,
    }

    try {
      const { data } = await updateProject({
        variables: {
          id: project?.id,
          data: mutationVariables,
        },
      })

      if (data) {
        displayToast({
          title: 'Project Updated!',
        })
        resetForm({
          values: values,
        })
      }
    } catch {
      displayToast({
        title: 'Oops! Something went wrong.',
        status: 'error',
      })
    }
  }

  const { data, error } = useQuery(GET_ALL_CLIENTS, {
    fetchPolicy: 'network-only',
  })

  const { clients = [] } = data || {}

  if (error) return <p>Error: {error.message}</p>

  return (
    <FormContainer
      submitButtonLabel={project ? 'Update' : 'Create'}
      disableSubmit={!dirty}
      isLoading={isSubmitting}
      onSubmit={handleSubmit}
    >
      <FormControl
        id="projectName"
        isRequired
        isInvalid={Boolean(errors.projectName && touched.projectName)}
      >
        <FormLabel>Project Name</FormLabel>
        <Input
          type="text"
          placeholder="e.g Ascendum"
          value={values.projectName}
          name="projectName"
          aria-label="project name"
          onChange={handleChange}
        />
        <FormErrorMessage>{errors.projectName}</FormErrorMessage>
      </FormControl>
      <FormControl
        id="startDate"
        isRequired
        isInvalid={Boolean(errors.startDate && touched.startDate)}
      >
        <FormLabel>Start Date</FormLabel>
        <DatePicker
          name="startDate"
          selected={values.startDate}
          onChange={(date: Date) => setFieldValue('startDate', date)}
        />

        <FormErrorMessage>{errors.startDate}</FormErrorMessage>
      </FormControl>

      <FormControl
        id="endDate"
        isInvalid={Boolean(errors.endDate && touched.endDate)}
      >
        <FormLabel>End Date (Optional)</FormLabel>
        <DatePicker
          name="endDate"
          selected={values.endDate}
          onChange={(date: Date) => setFieldValue('endDate', date)}
        />

        <FormErrorMessage>{errors.endDate}</FormErrorMessage>
      </FormControl>
      <FormControl
        id="clientId"
        isRequired
        isInvalid={Boolean(errors.clientId && touched.clientId)}
      >
        <FormLabel>Client</FormLabel>
        <Select
          name="clientId"
          value={values.clientId}
          aria-label="client"
          onChange={handleChange}
        >
          {clients.map((client: Client) => {
            return (
              <option key={client.id} value={client.id}>
                {client.clientName}
              </option>
            )
          })}
        </Select>
        <FormErrorMessage>{errors.clientId}</FormErrorMessage>
      </FormControl>
      <FormControl
        id="projectType"
        isRequired
        isInvalid={Boolean(errors.projectType && touched.projectType)}
      >
        <FormLabel>Project Type</FormLabel>
        <Select
          name="projectType"
          value={values.projectType}
          aria-label="project type"
          onChange={handleChange}
        >
          {ProjectTypeValues.map((projectType: ProjectType) => {
            return (
              <option key={projectType} value={projectType}>
                {projectType}
              </option>
            )
          })}
        </Select>
        <FormErrorMessage>{errors.projectType}</FormErrorMessage>
      </FormControl>
      <FormControl
        id="priority"
        isRequired
        isInvalid={Boolean(errors.priority && touched.priority)}
      >
        <FormLabel>Project Priority</FormLabel>
        <Select
          name="priority"
          value={values.priority}
          aria-label="project priority"
          onChange={handleChange}
        >
          {PriorityValues.map((priorityValue: Priority) => {
            return (
              <option key={priorityValue} value={priorityValue}>
                {priorityValue}
              </option>
            )
          })}
        </Select>
        <FormErrorMessage>{errors.priority}</FormErrorMessage>
      </FormControl>
      <FormControl
        id="confidence"
        isRequired
        isInvalid={Boolean(errors.confidence && touched.confidence)}
      >
        <FormLabel>Confidence - {values.confidence}%</FormLabel>
        <Slider
          aria-label="confidence"
          inputMode="numeric"
          colorScheme="primary"
          value={values.confidence}
          onChange={(value) => setFieldValue('confidence', value)}
        >
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb bg="secondary.500" />
        </Slider>
        <FormErrorMessage>{errors.confidence}</FormErrorMessage>
      </FormControl>
    </FormContainer>
  )
}
