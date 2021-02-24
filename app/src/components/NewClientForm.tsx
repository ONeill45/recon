import { useRouter } from 'next/router'
import React from 'react'
import { gql, useMutation } from '@apollo/client'
import styled from '@emotion/styled'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

import { useMsAccount } from 'utils/hooks'
import { Client } from 'interfaces'

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

const CreateClientFormInput = styled.input`
  width: 50%;
  padding: 5px 10px;
  margin: 8px 0;
`

const SubmitButton = styled.button``

const UpdateButton = styled.button``

const CREATE_CLIENT = gql`
  mutation CreateClient($data: CreateClientInput!) {
    createClient(data: $data) {
      id
    }
  }
`
const UPDATE_CLIENT = gql`
  mutation UpdateClient($id: String!, $data: UpdateClientInput!) {
    updateClient(id:$id, data: $data) {
      id
    }
  }
`
type ClientProps = {
  client?: Client
}

export const NewClientForm = ({ client }: ClientProps) => {
  const [clientName, setClientName] = React.useState(client ? client.clientName : '')
  const [description, setDescription] = React.useState(client ? client.description : '')
  const [logoUrl, setLogoUrl] = React.useState(client ? client.logoUrl : '')
  const [startDate, setStartDate] = React.useState(new Date())
  const [endDate, setEndDate] = React.useState<Date | null>(null)
  const id  = client ? client.id : null

  const router = useRouter()
  const account = useMsAccount()

  const [createClient] = useMutation(CREATE_CLIENT)
  const [updateClient] = useMutation(UPDATE_CLIENT)

  const createNewClient = async (e: React.FormEvent) => {
    e.preventDefault()
    await createClient({
      variables: {
        data: {
          clientName,
          description,
          logoUrl,
          startDate,
          endDate,
          createdBy: account?.username,
          updatedBy: account?.username,
        },
      },
    })
    router.push('/clients')
  }

  const updateClientById = async (e: React.FormEvent) => {
    e.preventDefault()
    await updateClient({
      variables: {
        id: id,
        data: {
          clientName,
          description,
          logoUrl,
          startDate,
          endDate,
          createdBy: account?.username,
          updatedBy: account?.username,
        },
      },
    })
    router.push('/clients')
  }

  return (
    <>
      <CreateClientForm>
        <CreateClientFormLabel>
          Client Name
          <CreateClientFormInput
            type="text"
            aria-label="client-name"
            onChange={(e) => setClientName(e.target.value)}
            value = {clientName}
          ></CreateClientFormInput>
        </CreateClientFormLabel>
        <CreateClientFormLabel>
          Description
          <CreateClientFormInput
            type="text"
            aria-label="description"
            onChange={(e) => setDescription(e.target.value)}
            value = {description}
          ></CreateClientFormInput>
        </CreateClientFormLabel>
        <CreateClientFormLabel>
          Logo Url (Optional)
          <CreateClientFormInput
            type="text"
            aria-label="logo-url"
            onChange={(e) => setLogoUrl(e.target.value)}
            defaultValue = {logoUrl}
          ></CreateClientFormInput>
        </CreateClientFormLabel>
        <CreateClientFormLabel>
          Start Date
          <DatePicker
            selected={startDate}
            onChange={(date: Date) => setStartDate(date)}
          ></DatePicker>
        </CreateClientFormLabel>
        <CreateClientFormLabel>
          End Date (Optional)
          <DatePicker
            selected={endDate}
            onChange={(date: Date) => setEndDate(date)}
          ></DatePicker>
        </CreateClientFormLabel>
        { id ? <UpdateButton name="Update" onClick={(e) => updateClientById(e)} >
          Update
        </UpdateButton> 
        :
        <SubmitButton name="Submit" onClick={(e) => createNewClient(e) }>
          Submit
        </SubmitButton>
        }
      </CreateClientForm>
    </>
  )
}
