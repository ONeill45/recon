import React from 'react'
import { useRouter } from 'next/router'
import { useMutation, useQuery } from '@apollo/client'
import { useFormik } from 'formik'
import * as yup from 'yup'
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
} from '@chakra-ui/react'

import { Resource, Department } from 'interfaces'
import { useMsAccount } from 'utils/hooks'
import { UPDATE_RESOURCE, CREATE_RESOURCE, GET_DEPARTMENTS } from 'queries'
import { DatePicker } from '../common/forms/Datepicker'
import { displayToast } from '../../utils/toast'
import { FormContainer } from '../common/forms/FormContainer'

type ResourceFormProps = {
  resource?: Resource
}

type ResourceFormValues = {
  terminationDate: Date | undefined
  departmentId: string
} & Omit<
  Resource,
  | 'id'
  | 'terminationDate'
  | 'department'
  | 'resourceAllocations'
  | 'createdBy'
  | 'createdDate'
  | 'updatedBy'
  | 'updatedDate'
  | 'deletedBy'
  | 'deletedDate'
>

const validationSchema = yup
  .object()
  .shape<Record<keyof ResourceFormValues, yup.AnySchema>>({
    firstName: yup.string().required('First Name is required'),
    lastName: yup.string().required('Last Name is required'),
    preferredName: yup.string().optional(),
    title: yup.string().required('Title is required'),
    departmentId: yup.string().required('Department is required'),
    imageUrl: yup.string().required('Image URL is required'),
    email: yup
      .string()
      .required('Email is required')
      .email('Must be a valid email address'),
    startDate: yup.date().required('Start date is required'),
    terminationDate: yup.date().optional(),
  })

export const ResourceForm: React.FC<ResourceFormProps> = ({ resource }) => {
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
  } = useFormik<ResourceFormValues>({
    initialValues: {
      firstName: resource?.firstName ?? '',
      lastName: resource?.lastName ?? '',
      preferredName: resource?.preferredName ?? '',
      title: resource?.title ?? '',
      imageUrl: resource?.imageUrl ?? '',
      email: resource?.email ?? '',
      departmentId: resource?.department?.id ?? '',

      startDate: resource?.startDate
        ? new Date(resource.startDate)
        : new Date(),
      terminationDate: resource?.terminationDate
        ? new Date(resource.terminationDate)
        : undefined,
    },
    validationSchema,
    onSubmit: (values) => {
      if (resource?.id) {
        updateExistingResource(values)
      } else {
        createNewResource(values)
      }
      setSubmitting(false)
    },
  })

  const id = resource?.id

  const router = useRouter()
  const account = useMsAccount()

  const [createResource] = useMutation(CREATE_RESOURCE)
  const [updateResource] = useMutation(UPDATE_RESOURCE)

  const createNewResource = async ({
    firstName,
    lastName,
    preferredName,
    title,
    departmentId,
    imageUrl,
    email,
    startDate,
    terminationDate,
  }: ResourceFormValues) => {
    const mutationVariables = {
      firstName,
      lastName,
      preferredName,
      title,
      departmentId: departmentId,
      imageUrl,
      email,
      startDate,
      terminationDate,
      updatedBy: account?.username,
      createdBy: account?.username,
    }

    try {
      const { data } = await createResource({
        variables: {
          data: mutationVariables,
        },
      })

      if (data) {
        displayToast({
          title: 'Resource Created!',
        })
        setTimeout(() => {
          router.push('/resources')
        }, 3000)
      }
    } catch {
      displayToast({
        title: 'Oops! Something went wrong.',
        status: 'error',
      })
    }
  }

  const updateExistingResource = async ({
    firstName,
    lastName,
    preferredName,
    title,
    departmentId,
    imageUrl,
    email,
    startDate,
    terminationDate,
  }: ResourceFormValues) => {
    const mutationVariables = {
      firstName,
      lastName,
      preferredName,
      title,
      departmentId,
      imageUrl,
      email,
      startDate,
      terminationDate,
      updatedBy: account?.username,
    }

    try {
      const { data } = await updateResource({
        variables: {
          id: id,
          data: mutationVariables,
        },
      })

      if (data) {
        displayToast({
          title: 'Resource Updated!',
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

  const { data, error } = useQuery(GET_DEPARTMENTS, {
    fetchPolicy: 'network-only',
  })

  const { departments = [] } = data || {}

  if (error) return <p>Error: {error.message}</p>

  return (
    <FormContainer
      onSubmit={handleSubmit}
      submitButtonLabel={id ? 'Update' : 'Create'}
      disableSubmit={!dirty}
      isLoading={isSubmitting}
    >
      <FormControl
        id="firstName"
        isRequired
        isInvalid={Boolean(errors.firstName && touched.firstName)}
      >
        <FormLabel>First Name</FormLabel>
        <Input
          name="firstName"
          type="text"
          aria-label="first-name"
          onChange={handleChange}
          value={values.firstName}
        />
        <FormErrorMessage>{errors.firstName}</FormErrorMessage>
      </FormControl>
      <FormControl
        id="lastName"
        isRequired
        isInvalid={Boolean(errors.lastName && touched.lastName)}
      >
        <FormLabel>Last Name</FormLabel>
        <Input
          name="lastName"
          type="text"
          aria-label="last-name"
          onChange={handleChange}
          value={values.lastName}
        />
        <FormErrorMessage>{errors.lastName}</FormErrorMessage>
      </FormControl>
      <FormControl
        id="preferredName"
        isInvalid={Boolean(errors.preferredName && touched.preferredName)}
      >
        <FormLabel>Preferred Name</FormLabel>
        <Input
          name="preferredName"
          type="text"
          aria-label="preferred-name"
          onChange={handleChange}
          value={values.preferredName}
        />
        <FormErrorMessage>{errors.preferredName}</FormErrorMessage>
      </FormControl>
      <FormControl
        id="title"
        isRequired
        isInvalid={Boolean(errors.title && touched.title)}
      >
        <FormLabel>Title</FormLabel>
        <Input
          name="title"
          type="text"
          aria-label="title"
          onChange={handleChange}
          value={values.title}
        />
        <FormErrorMessage>{errors.title}</FormErrorMessage>
      </FormControl>
      <FormControl
        id="departmentId"
        isRequired
        isInvalid={Boolean(errors.departmentId && touched.departmentId)}
      >
        <FormLabel>Department</FormLabel>
        <Select
          name="departmentId"
          value={values.departmentId}
          aria-label="department-select"
          onChange={handleChange}
        >
          {departments.map((department: Department) => {
            return (
              <option key={department.id} value={department.id}>
                {department.name}
              </option>
            )
          })}
        </Select>
        <FormErrorMessage>{errors.departmentId}</FormErrorMessage>
      </FormControl>
      <FormControl
        id="imageUrl"
        isRequired
        isInvalid={Boolean(errors.imageUrl && touched.imageUrl)}
      >
        <FormLabel>Image Url</FormLabel>
        <Input
          name="imageUrl"
          type="text"
          aria-label="image-url"
          onChange={handleChange}
          value={values.imageUrl}
        />
        <FormErrorMessage>{errors.imageUrl}</FormErrorMessage>
      </FormControl>
      <FormControl
        id="email"
        isRequired
        isInvalid={Boolean(errors.email && touched.email)}
      >
        <FormLabel>Email</FormLabel>
        <Input
          name="email"
          type="text"
          aria-label="email"
          onChange={handleChange}
          value={values.email}
        />
        <FormErrorMessage>{errors.email}</FormErrorMessage>
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
        ></DatePicker>
        <FormErrorMessage>{errors.startDate}</FormErrorMessage>
      </FormControl>
      <FormControl
        id="terminationDate"
        isInvalid={Boolean(errors.terminationDate && touched.terminationDate)}
      >
        <FormLabel>Termination Date (Optional)</FormLabel>
        <DatePicker
          name="terminationDate"
          selected={values.terminationDate}
          onChange={(date: Date) => setFieldValue('terminationDate', date)}
        ></DatePicker>
        <FormErrorMessage>{errors.terminationDate}</FormErrorMessage>
      </FormControl>
    </FormContainer>
  )
}
