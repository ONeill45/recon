import React from 'react'
import { useRouter } from 'next/router'
import { useMutation } from '@apollo/client'
import * as yup from 'yup'
import { useFormik } from 'formik'
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Textarea,
} from '@chakra-ui/react'

import { useMsAccount } from 'utils/hooks'
import { Client } from 'interfaces'
import { CREATE_CLIENT, UPDATE_CLIENT } from 'queries'
import { DatePicker } from '../common/forms/Datepicker'
import { displayToast } from '../../utils/toast'
import { FormContainer } from '../common/forms/FormContainer'

type ClientFormProps = {
  client?: Client
}

type ClientFormValues = {
  endDate: Date | undefined
} & Omit<
  Client,
  | 'id'
  | 'endDate'
  | 'createdBy'
  | 'createdDate'
  | 'updatedBy'
  | 'updatedDate'
  | 'deletedBy'
  | 'deletedDate'
>

const validationSchema = yup
  .object()
  .shape<Record<keyof ClientFormValues, yup.AnySchema>>({
    clientName: yup.string().required('Client Name is required'),
    description: yup.string().required('Description is required'),
    logoUrl: yup.string().optional(),
    startDate: yup.date().required('Start Date is required'),
    endDate: yup.date().optional(),
  })

export const ClientForm: React.FC<ClientFormProps> = ({ client }) => {
  const id = client?.id

  const router = useRouter()
  const account = useMsAccount()

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
  } = useFormik<ClientFormValues>({
    initialValues: {
      clientName: client?.clientName ?? '',
      description: client?.description ?? '',
      logoUrl: client?.logoUrl ?? '',
      startDate: client?.startDate ? new Date(client.startDate) : new Date(),
      endDate: client?.endDate ? new Date(client.endDate) : undefined,
    },
    validationSchema,
    onSubmit: (values) => {
      if (client?.id) {
        updateClientById(values)
      } else {
        createNewClient(values)
      }
      setSubmitting(false)
    },
  })

  const [createClient] = useMutation(CREATE_CLIENT)
  const [updateClient] = useMutation(UPDATE_CLIENT)

  const createNewClient = async ({
    clientName,
    description,
    logoUrl,
    startDate,
    endDate,
  }: ClientFormValues) => {
    const mutationVariables = {
      clientName,
      description,
      logoUrl,
      startDate,
      endDate,
      createdBy: account?.username,
      updatedBy: account?.username,
    }

    try {
      const { data } = await createClient({
        variables: {
          id: id,
          data: mutationVariables,
        },
      })

      if (data) {
        displayToast({
          title: 'Client Created!',
        })

        setTimeout(() => {
          router.push('/clients')
        }, 3000)
      }
    } catch {
      displayToast({
        title: 'Oops! Something went wrong.',
        status: 'error',
      })
    }
  }

  const updateClientById = async ({
    clientName,
    description,
    logoUrl,
    startDate,
    endDate,
  }: ClientFormValues) => {
    const mutationVariables = {
      clientName,
      description,
      logoUrl,
      startDate,
      endDate,
      updatedBy: account?.username,
    }
    try {
      const { data } = await updateClient({
        variables: {
          id: id,
          data: mutationVariables,
        },
      })

      if (data) {
        displayToast({
          title: 'Client Updated!',
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

  return (
    <FormContainer
      onSubmit={handleSubmit}
      submitButtonLabel={id ? 'Update' : 'Create'}
      disableSubmit={!dirty}
      isLoading={isSubmitting}
    >
      <FormControl
        id="clientName"
        isRequired
        isInvalid={Boolean(errors.clientName && touched.clientName)}
      >
        <FormLabel>Client Name</FormLabel>
        <Input
          data-testid="client-name-field"
          type="text"
          placeholder="e.g Ascendum"
          value={values.clientName}
          name="clientName"
          onChange={handleChange}
        />
        <FormErrorMessage>{errors.clientName}</FormErrorMessage>
      </FormControl>
      <FormControl
        id="description"
        isRequired
        isInvalid={Boolean(errors.description && touched.description)}
      >
        <FormLabel>Description</FormLabel>
        <Textarea
          name="description"
          data-testid="description-field"
          placeholder="A description of the client"
          onChange={handleChange}
          value={values.description}
        />
        <FormErrorMessage>{errors.description}</FormErrorMessage>
      </FormControl>
      <FormControl
        id="logoUrl"
        isRequired
        isInvalid={Boolean(errors.logoUrl && touched.logoUrl)}
      >
        <FormLabel>Logo URL</FormLabel>
        <Textarea
          placeholder="Url of the Logo"
          name="logoUrl"
          data-testid="logo-url-field"
          onChange={handleChange}
          value={values.logoUrl}
        />
        <FormErrorMessage>{errors.logoUrl}</FormErrorMessage>
      </FormControl>
      <FormControl
        id="startDate"
        isRequired
        isInvalid={Boolean(errors.startDate && touched.startDate)}
      >
        <FormLabel>Start Date</FormLabel>
        <DatePicker
          selected={values.startDate}
          onChange={(date: Date) => setFieldValue('startDate', date)}
        ></DatePicker>
        <FormErrorMessage>{errors.startDate}</FormErrorMessage>
      </FormControl>
      <FormControl
        id="endDate"
        isInvalid={Boolean(errors.endDate && touched.endDate)}
      >
        <FormLabel>End Date (Optional)</FormLabel>
        <DatePicker
          selected={values.endDate}
          onChange={(date: Date) => setFieldValue('endDate', date)}
        ></DatePicker>
        <FormErrorMessage>{errors.endDate}</FormErrorMessage>
      </FormControl>
    </FormContainer>
  )
}
