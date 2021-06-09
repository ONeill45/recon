import React, { FormEvent, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useMutation } from '@apollo/client'

import { FormControl, FormLabel, Input, Textarea } from '@chakra-ui/react'
import styled from '@emotion/styled'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { validateMutationParams } from 'utils/functions'
import { useMsAccount } from 'utils/hooks'
import { useToast } from 'utils/hooks'
import { Client } from 'interfaces'
import { Toast } from 'components/common/Toast'
import { CREATE_CLIENT, UPDATE_CLIENT } from 'queries'

const SubmitButton = styled.button`
  display: block;
  margin-top: 1rem;
`

type ClientProps = {
  client?: Client
}

export const ClientForm: React.FC<ClientProps> = ({ client }) => {
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
      <form onChange={() => setHasFormChanged(true)}>
        <FormControl id="clientName">
          <FormLabel>Client Name</FormLabel>
          <Input
            data-testid="client-name-field"
            type="text"
            placeholder="e.g Ascendum"
            value={clientName}
            onChange={(e: FormEvent<HTMLInputElement>) =>
              setClientName(e.currentTarget.value)
            }
          />
        </FormControl>
        <FormControl id="description">
          <FormLabel>Description</FormLabel>
          <Textarea
            data-testid="description-field"
            placeholder="A description of the client"
            onChange={(e: FormEvent<HTMLTextAreaElement>) =>
              setDescription(e.currentTarget.value)
            }
            value={description}
          />
        </FormControl>
        <FormControl id="logoUrl" data-testid="logo-url-field">
          <FormLabel>Description</FormLabel>
          <Textarea
            placeholder="A description of the client"
            onChange={(e: FormEvent<HTMLTextAreaElement>) =>
              setLogoUrl(e.currentTarget.value)
            }
            value={logoUrl}
          />
        </FormControl>
        <FormControl id="startDate">
          <FormLabel>Start Date</FormLabel>
          <DatePicker
            selected={startDate}
            onChange={(date: Date) => setStartDate(date)}
          ></DatePicker>
        </FormControl>
        <FormControl id="logoUrl">
          <FormLabel>Description</FormLabel>
          <DatePicker
            selected={startDate}
            onChange={(date: Date) => setStartDate(date)}
          ></DatePicker>
        </FormControl>
        <FormControl id="endDate">
          <FormLabel>End Date (Optional)</FormLabel>
          <DatePicker
            selected={endDate}
            onChange={(date: Date) => setEndDate(date)}
          ></DatePicker>
        </FormControl>

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
      </form>
    </>
  )
}
