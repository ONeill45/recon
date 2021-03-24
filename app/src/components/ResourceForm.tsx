import { useRouter } from 'next/router'
import React from 'react'
import { gql, useMutation } from '@apollo/client'
import styled from '@emotion/styled'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { DepartmentDropDown } from '../components/DepartmentDropDown'
import { Resource, Department } from 'interfaces'
import { useMsAccount } from 'utils/hooks'

const CreateResourceForm = styled.form`
  margin: 1rem 0;
  padding-left: 35%;
`
const CreateResourceFormLabel = styled.label`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0.6rem 0;
`

const CreateResourceFormInput = styled.input`
  width: 50%;
  padding: 0.3rem 0.6rem;
  margin: 0.5rem 0;
`

const ButtonContainer = styled.div`
  text-align: center;
  margin-bottom: 1rem;
`

const CancelButton = styled.button`
  margin-right: 1rem;
`

const CREATE_RESOURCE = gql`
  mutation CreateResource($data: CreateResourceInput!) {
    createResource(data: $data) {
      id
    }
  }
`

const UPDATE_RESOURCE = gql`
  mutation UpdateResource($id: String!, $data: UpdateResourceInput!) {
    updateResource(id: $id, data: $data) {
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
  const [preferredName, setPreferredName] = React.useState(resource?.preferredName || '')
  const [title, setTitle] = React.useState(resource?.title || '')
  const [imageUrl, setImageUrl] = React.useState(resource?.imageUrl || '')
  const [email, setEmail] = React.useState(resource?.email || '')
  const [startDate, setStartDate] = React.useState<Date | null>(resource?.startDate ? new Date(resource?.startDate) : new Date())
  const [terminationDate, setTerminationDate] = React.useState<Date | null>(resource?.terminationDate ? new Date(resource?.terminationDate) : null)
  const [department, setDepartment] = React.useState<Department | null>(resource?.department || null)

  const id = resource?.id
  const [isFormChanged, setIsFormChanged] = React.useState(false)
  
  const router = useRouter()
  const account = useMsAccount()

  const [createResource] = useMutation(CREATE_RESOURCE)
  const [updateResource] = useMutation(UPDATE_RESOURCE)

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

  const updateExistingResource = async (e: React.FormEvent) => {
    e.preventDefault()
    await updateResource({
      variables: {
        id: id,
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
          updatedBy: account?.username,
        },
      },
    })
  }

  const formChange = () => {
    setIsFormChanged(true)
  }

  const cancelClicked = () => {
    router.push(id ? '/resources/' + id : '/resources') 
  }

  // Added these effects for detecting changes on the date
  // pickers since they do not trigger a change event on the
  // <CreateResourceForm> component when they are modified
  React.useEffect(() => {
      setIsFormChanged(true)
  }, [startDate, terminationDate])

  React.useEffect(() => {
    setIsFormChanged(false)
  }, [])

  return (
    <>
      <CreateResourceForm onChange={formChange}>
        <CreateResourceFormLabel>
          First Name
          <CreateResourceFormInput
            type="text"
            aria-label="resource-name"
            onChange={(e: React.FormEvent<HTMLInputElement>) => setFirstName(e.currentTarget.value)}
            value={firstName}
          ></CreateResourceFormInput>
        </CreateResourceFormLabel>
        <CreateResourceFormLabel>
          Last Name
          <CreateResourceFormInput
            type="text"
            aria-label="resource-name"
            onChange={(e: React.FormEvent<HTMLInputElement>) => setLastName(e.currentTarget.value)}
            value={lastName}
          ></CreateResourceFormInput>
        </CreateResourceFormLabel>
        <CreateResourceFormLabel>
          Preferred Name
          <CreateResourceFormInput
            type="text"
            aria-label="resource-name"
            onChange={(e: React.FormEvent<HTMLInputElement>) => setPreferredName(e.currentTarget.value)}
            value={preferredName}
          ></CreateResourceFormInput>
        </CreateResourceFormLabel>
        <CreateResourceFormLabel>
          Title
          <CreateResourceFormInput
            type="text"
            aria-label="resource-name"
            onChange={(e: React.FormEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)}
            value={title}
          ></CreateResourceFormInput>
        </CreateResourceFormLabel>
        <CreateResourceFormLabel>
          Department
          <DepartmentDropDown
            setDepartment={setDepartment}
          ></DepartmentDropDown>
        </CreateResourceFormLabel>
        <CreateResourceFormLabel>
          ImageUrl
          <CreateResourceFormInput
            type="text"
            aria-label="resource-name"
            onChange={(e: React.FormEvent<HTMLInputElement>) => setImageUrl(e.currentTarget.value)}
            value={imageUrl}
          ></CreateResourceFormInput>
        </CreateResourceFormLabel>
        <CreateResourceFormLabel>
          Email
          <CreateResourceFormInput
            type="text"
            aria-label="resource-name"
            onChange={(e: React.FormEvent<HTMLInputElement>) => setEmail(e.currentTarget.value)}
            value={email}
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
      </CreateResourceForm>
      <ButtonContainer>
        <CancelButton name="Cancel" onClick={cancelClicked}>
          Cancel
        </CancelButton>
        {id ? (
            <button name="Save" disabled={!isFormChanged} onClick={updateExistingResource}>
              Save
            </button>
        ) : (
          <button name="Submit" onClick={createNewResource}>
            Submit
          </button>
        )}
      </ButtonContainer>
    </>
  )
}

export default ResourceForm