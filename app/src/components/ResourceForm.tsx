import { useRouter } from 'next/router'
import React from 'react'
import { gql, useMutation } from '@apollo/client'
import styled from '@emotion/styled'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

import { useMsAccount } from 'utils/hooks'
import { Resource } from 'interfaces'

const CreateResourceForm = styled.form`
  margin-top: 30px;
  padding-left: 35%;
`
const CreateResourceFormLabel = styled.label`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px 0 10px 0;
`

const CreateResourceFormInput = styled.input`
  width: 50%;
  padding: 5px 10px;
  margin: 8px 0;
`

const SubmitButton = styled.button``

const CREATE_RESOURCE = gql`
  mutation CreateResource($data: CreateResourceInput!) {
    createResource(data: $data) {
      id
    }
  }
`
type ResourceProps = {
  resource?: Resource
}

export const ResourceForm = ({ resource }: ResourceProps) => {
  const [firstName, setFirstName] = React.useState(resource?.firstName || '')
  const [lastName, setLastName] = React.useState(resource?.lastName || '')
  const [preferredName, setPreferredName] = React.useState(
    resource?.preferredName || '',
  )
  const [title, setTitle] = React.useState(resource?.title || '')
  const [department, setDepartment] = React.useState(resource?.department || '')
  const [imageUrl, setImageUrl] = React.useState(resource?.imageUrl || '')
  const [email, setEmail] = React.useState(resource?.email || '')
  const [startDate, setStartDate] = React.useState(new Date())
  const [terminationDate, setTerminationDate] = React.useState<Date | null>(
    null,
  )

  const router = useRouter()
  const account = useMsAccount()

  const [createResource] = useMutation(CREATE_RESOURCE)

  const createNewResource = async (e: React.FormEvent) => {
    e.preventDefault()
    await createResource({
      variables: {
        data: {
          firstName,
          lastName,
          preferredName,
          title,
          department,
          imageUrl,
          email,
          startDate,
          terminationDate,
          createdBy: account?.username,
        },
      },
    })
    router.push('/resources')
  }

  return (
    <>
      <CreateResourceForm>
        <CreateResourceFormLabel>
          First Name
          <CreateResourceFormInput
            type="text"
            aria-label="resource-name"
            onChange={(e) => setFirstName(e.target.value)}
          ></CreateResourceFormInput>
        </CreateResourceFormLabel>
        <CreateResourceFormLabel>
          Last Name
          <CreateResourceFormInput
            type="text"
            aria-label="resource-name"
            onChange={(e) => setLastName(e.target.value)}
          ></CreateResourceFormInput>
        </CreateResourceFormLabel>
        <CreateResourceFormLabel>
          Preferred Name
          <CreateResourceFormInput
            type="text"
            aria-label="resource-name"
            onChange={(e) => setPreferredName(e.target.value)}
          ></CreateResourceFormInput>
        </CreateResourceFormLabel>
        <CreateResourceFormLabel>
          Title
          <CreateResourceFormInput
            type="text"
            aria-label="resource-name"
            onChange={(e) => setTitle(e.target.value)}
          ></CreateResourceFormInput>
        </CreateResourceFormLabel>
        <CreateResourceFormLabel>
          Department
          <CreateResourceFormInput
            type="text"
            aria-label="resource-name"
            onChange={(e) => setDepartment(e.target.value)}
          ></CreateResourceFormInput>
        </CreateResourceFormLabel>
        <CreateResourceFormLabel>
          ImageUrl
          <CreateResourceFormInput
            type="text"
            aria-label="resource-name"
            onChange={(e) => setImageUrl(e.target.value)}
          ></CreateResourceFormInput>
        </CreateResourceFormLabel>
        <CreateResourceFormLabel>
          Email
          <CreateResourceFormInput
            type="text"
            aria-label="resource-name"
            onChange={(e) => setEmail(e.target.value)}
          ></CreateResourceFormInput>
        </CreateResourceFormLabel>
        <CreateResourceFormLabel>
          Start Date
          <DatePicker
            onChange={(date: Date) => setStartDate(date)}
          ></DatePicker>
        </CreateResourceFormLabel>
        <CreateResourceFormLabel>
          Termination Date (Optional)
          <DatePicker
            onChange={(date: Date) => setTerminationDate(date)}
          ></DatePicker>
        </CreateResourceFormLabel>
        <SubmitButton name="Submit" onClick={createNewResource}>
          Submit
        </SubmitButton>
      </CreateResourceForm>
    </>
  )
}
