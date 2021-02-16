import { useRouter } from 'next/router'
import React from 'react'
import { gql, useMutation } from '@apollo/client'
import styled from '@emotion/styled'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

import { useMsAccount } from 'utils/hooks'

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

const CREATE_CLIENT = gql`
  mutation CreateClient($data: CreateClientInput!) {
    createClient(data: $data) {
      id
    }
  }
`

export const NewClientForm = () => {
  const [clientName, setClientName] = React.useState('')
  const [description, setDescription] = React.useState('')
  const [logoUrl, setLogoUrl] = React.useState('')
  const [startDate, setStartDate] = React.useState<Date | null>(null)
  const [endDate, setEndDate] = React.useState<Date | null>(null)
  const router = useRouter()
  const account = useMsAccount()

  const [createClient] = useMutation(CREATE_CLIENT)

  const onSubmit = async (e: React.FormEvent) => {
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

  return (
    <>
      <CreateClientForm onSubmit={(e) => onSubmit(e)}>
        <CreateClientFormLabel>
          Client Name
          <CreateClientFormInput
            type="text"
            aria-label="client-name"
            onChange={(e) => setClientName(e.target.value)}
          />
        </CreateClientFormLabel>
        <CreateClientFormLabel>
          Description
          <CreateClientFormInput
            type="text"
            aria-label="description"
            onChange={(e) => setDescription(e.target.value)}
          />
        </CreateClientFormLabel>
        <CreateClientFormLabel>
          Logo Url (Optional)
          <CreateClientFormInput
            type="text"
            aria-label="logo-url"
            onChange={(e) => setLogoUrl(e.target.value)}
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
        <SubmitButton type="submit" name="Submit">
          Submit
        </SubmitButton>
      </CreateClientForm>
    </>
  )
}
