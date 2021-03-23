import { useRouter } from 'next/router'
import React from 'react'
import { gql, useMutation } from '@apollo/client'
import styled from '@emotion/styled'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { DepartmentDropDown } from '../components/DepartmentDropDown'
import { Department } from 'interfaces'
import { useMsAccount } from 'utils/hooks'

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

export const CREATE_RESOURCE = gql`
  mutation CreateResource($data: CreateResourceInput!) {
    createResource(data: $data) {
      id
    }
  }
`
export const ResourceForm = () => {
  const [firstName, setFirstName] = React.useState('')
  const [lastName, setLastName] = React.useState('')
  const [preferredName, setPreferredName] = React.useState('')
  const [title, setTitle] = React.useState('')
  const [imageUrl, setImageUrl] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [startDate, setStartDate] = React.useState(new Date())
  const [terminationDate, setTerminationDate] = React.useState<Date | null>(
    null,
  )
  const [department, setDepartment] = React.useState<Department | null>(null)

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
          departmentId: department?.id,
          imageUrl,
          email,
          startDate,
          terminationDate,
          createdBy: account?.username,
          updatedBy: account?.username,
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
            aria-label="first-name"
            onChange={(e) => setFirstName(e.target.value)}
          ></CreateResourceFormInput>
        </CreateResourceFormLabel>
        <CreateResourceFormLabel>
          Last Name
          <CreateResourceFormInput
            type="text"
            aria-label="last-name"
            onChange={(e) => setLastName(e.target.value)}
          ></CreateResourceFormInput>
        </CreateResourceFormLabel>
        <CreateResourceFormLabel>
          Preferred Name
          <CreateResourceFormInput
            type="text"
            aria-label="preferred-name"
            onChange={(e) => setPreferredName(e.target.value)}
          ></CreateResourceFormInput>
        </CreateResourceFormLabel>
        <CreateResourceFormLabel>
          Title
          <CreateResourceFormInput
            type="text"
            aria-label="title"
            onChange={(e) => setTitle(e.target.value)}
          ></CreateResourceFormInput>
        </CreateResourceFormLabel>
        <CreateResourceFormLabel>
          Department
          <DepartmentDropDown
            department={department}
            setDepartment={setDepartment}
          ></DepartmentDropDown>
        </CreateResourceFormLabel>
        <CreateResourceFormLabel>
          ImageUrl
          <CreateResourceFormInput
            type="text"
            aria-label="image-url"
            onChange={(e) => setImageUrl(e.target.value)}
          ></CreateResourceFormInput>
        </CreateResourceFormLabel>
        <CreateResourceFormLabel>
          Email
          <CreateResourceFormInput
            type="text"
            aria-label="email"
            onChange={(e) => setEmail(e.target.value)}
          ></CreateResourceFormInput>
        </CreateResourceFormLabel>
        <CreateResourceFormLabel>
          Start Date
          <DatePicker
            selected={startDate}
            onChange={(date: Date) => setStartDate(date)}
          ></DatePicker>
        </CreateResourceFormLabel>
        <CreateResourceFormLabel>
          Termination Date (Optional)
          <DatePicker
            selected={terminationDate}
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

export default ResourceForm
