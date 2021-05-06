import { useRouter } from 'next/router'
import React, { FormEvent, useState, useEffect } from 'react'
import { gql, useMutation } from '@apollo/client'
import styled from '@emotion/styled'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { validateMutationParams } from 'utils/functions'
import { useMsAccount } from 'utils/hooks'
import { Client } from 'interfaces'
import { Toast } from 'components'
import { useToast } from 'hooks'

const CreateClientForm = styled.form`
  margin: 1rem 0;
  padding-left: 35%;
`
const CreateClientFormLabel = styled.label`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0.6rem 0;
`

const CreateClientFormInput = styled.input`
  width: 50%;
  padding: 0.3rem 0.6rem;
  margin: 0.5rem 0;
`

const SubmitButton = styled.button`
  display: block;
  margin-top: 1rem;
`

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
type ClientProps = {
  client?: Client
}

export const ClientForm = ({ client }: ClientProps) => {
  const [clientName, setClientName] = useState(client?.clientName || '')
  const [description, setDescription] = useState(client?.description || '')
  const [logoUrl, setLogoUrl] = useState(client?.logoUrl || '')
  const [startDate, setStartDate] = useState(
    client?.startDate ? new Date(client?.startDate) : new Date(),
  )
  const [endDate, setEndDate] = useState<Date | null>(
    client?.endDate ? new Date(client?.endDate) : null,
  )
  const [hasFormChanged, setHasFormChanged] = useState(false)
  const id = client?.id

  const router = useRouter()
  const account = useMsAccount()

  const [createClient] = useMutation(CREATE_CLIENT)
  const [updateClient] = useMutation(UPDATE_CLIENT)

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

  const createNewClient = async (e: FormEvent) => {
    e.preventDefault()

    const mutationVariables = {
      clientName,
      description,
      logoUrl,
      startDate,
      endDate,
      createdBy: account?.username,
      updatedBy: account?.username,
    }

    const mutationParams = [
      {
        clientName: clientName,
        displayText: 'Client name',
      },
      {
        description: description,
        displayText: 'Description',
      },
      {
        startDate: startDate,
        displayText: 'Start date',
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
        const { data } = await createClient({
          variables: {
            id: id,
            data: mutationVariables,
          },
        })

        if (data) {
          setToastHeader('Successfully created Client!')
          setToastFields([])
          setUpdateSuccess(true)
          setDisplayToast(true)
          setTimeout(() => {
            router.push('/clients')
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

  const updateClientById = async (e: FormEvent) => {
    e.preventDefault()

    const mutationVariables = {
      clientName,
      description,
      logoUrl,
      startDate,
      endDate,
      updatedBy: account?.username,
    }

    const mutationParams = [
      {
        clientName: clientName,
        displayText: 'Client name',
      },
      {
        description: description,
        displayText: 'Description',
      },
      {
        startDate: startDate,
        displayText: 'Start date',
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
        const { data } = await updateClient({
          variables: {
            id: id,
            data: mutationVariables,
          },
        })

        if (data) {
          setToastHeader('Successfully updated Client!')
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

  // Added these effects for detecting changes on the date
  // pickers since they do not trigger a change event on the
  // <CreateResourceForm> component when they are modified
  useEffect(() => {
    setHasFormChanged(true)
  }, [startDate, endDate])

  useEffect(() => {
    setHasFormChanged(false)
  }, [])

  return (
    <>
      <Toast
        headerText={toastHeader}
        fields={toastFields}
        success={updateSuccess}
        display={displayToast}
        setDisplayToast={setDisplayToast}
      />
      <CreateClientForm onChange={() => setHasFormChanged(true)}>
        <CreateClientFormLabel>Client Name</CreateClientFormLabel>
        <CreateClientFormInput
          type="text"
          aria-label="client-name"
          onChange={(e: FormEvent<HTMLInputElement>) =>
            setClientName(e.currentTarget.value)
          }
          value={clientName}
        ></CreateClientFormInput>
        <CreateClientFormLabel>Description</CreateClientFormLabel>
        <CreateClientFormInput
          type="text"
          aria-label="description"
          onChange={(e: FormEvent<HTMLInputElement>) =>
            setDescription(e.currentTarget.value)
          }
          value={description}
        ></CreateClientFormInput>
        <CreateClientFormLabel>Logo Url (Optional)</CreateClientFormLabel>
        <CreateClientFormInput
          type="text"
          aria-label="logo-url"
          onChange={(e: FormEvent<HTMLInputElement>) =>
            setLogoUrl(e.currentTarget.value)
          }
          defaultValue={logoUrl}
        ></CreateClientFormInput>
        <CreateClientFormLabel>Start Date</CreateClientFormLabel>
        <DatePicker
          selected={startDate}
          onChange={(date: Date) => setStartDate(date)}
        ></DatePicker>
        <CreateClientFormLabel>End Date (Optional)</CreateClientFormLabel>
        <DatePicker
          selected={endDate}
          onChange={(date: Date) => setEndDate(date)}
        ></DatePicker>
        {id ? (
          <SubmitButton
            name="Update"
            disabled={!hasFormChanged}
            onClick={updateClientById}
          >
            Update
          </SubmitButton>
        ) : (
          <SubmitButton name="Submit" onClick={createNewClient}>
            Submit
          </SubmitButton>
        )}
      </CreateClientForm>
    </>
  )
}
