import { useRouter } from 'next/router'
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { gql, useMutation, useQuery } from '@apollo/client'
import styled from '@emotion/styled'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { Resource, Department } from 'interfaces'
import { validateMutationParams } from 'utils/functions'
import { useMsAccount } from 'utils/hooks'
import { Toast } from 'components'
import { useToast } from 'hooks'

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

const DepartmentSelect = styled.select`
  width: 50%;
  padding: 0.3rem 0.6rem;
  margin: 0.5rem 0;
`

const SubmitButton = styled.button`
  display: block;
  margin-top: 1rem;
`

export const GET_ALL_DEPARTMENTS = gql`
  {
    departments {
      id
      name
    }
  }
`

export const CREATE_RESOURCE = gql`
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
  const [firstName, setFirstName] = useState(resource?.firstName || '')
  const [lastName, setLastName] = useState(resource?.lastName || '')
  const [preferredName, setPreferredName] = useState(
    resource?.preferredName || '',
  )
  const [title, setTitle] = useState(resource?.title || '')
  const [imageUrl, setImageUrl] = useState(resource?.imageUrl || '')
  const [email, setEmail] = useState(resource?.email || '')
  const [startDate, setStartDate] = useState<Date | null>(
    resource?.startDate ? new Date(resource?.startDate) : new Date(),
  )
  const [terminationDate, setTerminationDate] = useState<Date | null>(
    resource?.terminationDate ? new Date(resource?.terminationDate) : null,
  )
  const [department, setDepartment] = useState(resource?.department || null)

  const id = resource?.id
  const [hasFormChanged, setHasFormChanged] = useState(false)

  const router = useRouter()
  const account = useMsAccount()

  const [createResource] = useMutation(CREATE_RESOURCE)
  const [updateResource] = useMutation(UPDATE_RESOURCE)

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

  const handleDepartmentInput = (e: ChangeEvent<HTMLSelectElement>) => {
    setDepartment(
      departments.find(
        (department: Department) => e.target.value === department.id,
      ),
    )
  }

  const createNewResource = async (e: FormEvent) => {
    e.preventDefault()

    const mutationVariables = {
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
      createdBy: account?.username,
    }

    const mutationParams = [
      {
        firstName: firstName,
        displayText: 'First name',
      },
      {
        lastName: lastName,
        displayText: 'Last name',
      },
      {
        title: title,
        displayText: 'Title',
      },
      {
        department: department?.id,
        displayText: 'Department name',
      },
      {
        email: email,
        displayText: 'Email',
      },
      {
        startDate: startDate,
        displayText: 'Start Date',
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
        const { data } = await createResource({
          variables: {
            data: mutationVariables,
          },
        })

        if (data) {
          setToastHeader('Successfully created Resource!')
          setToastFields([])
          setUpdateSuccess(true)
          setDisplayToast(true)
          setTimeout(() => {
            router.push('/resources')
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

  const updateExistingResource = async (e: FormEvent) => {
    e.preventDefault()

    const mutationVariables = {
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
    }

    const mutationParams = [
      {
        firstName: firstName,
        displayText: 'First name',
      },
      {
        lastName: lastName,
        displayText: 'Last name',
      },
      {
        title: title,
        displayText: 'Title',
      },
      {
        department: department?.id,
        displayText: 'Department name',
      },
      {
        email: email,
        displayText: 'Email',
      },
      {
        startDate: startDate,
        displayText: 'Start Date',
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
        const { data } = await updateResource({
          variables: {
            id: id,
            data: mutationVariables,
          },
        })

        if (data) {
          setToastHeader('Successfully updated Resource!')
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
  }, [startDate, terminationDate])

  useEffect(() => {
    setHasFormChanged(false)
  }, [])

  const { data, error } = useQuery(GET_ALL_DEPARTMENTS, {
    fetchPolicy: 'network-only',
  })

  const { departments = [] } = data || {}

  useEffect(() => {
    if (departments.length) {
      if (resource) {
        const department = departments.find(
          (d: Department) => d.id === resource.department.id,
        )
        setDepartment(department)
      } else {
        setDepartment(departments[0])
      }
    }
  }, [departments])

  if (error) return <p>Error: {error.message}</p>

  return (
    <>
      <Toast
        headerText={toastHeader}
        fields={toastFields}
        success={updateSuccess}
        display={displayToast}
        setDisplayToast={setDisplayToast}
      />
      <CreateResourceForm onChange={() => setHasFormChanged(true)}>
        <CreateResourceFormLabel>First Name</CreateResourceFormLabel>
        <CreateResourceFormInput
          type="text"
          aria-label="first-name"
          onChange={(e: FormEvent<HTMLInputElement>) =>
            setFirstName(e.currentTarget.value)
          }
          value={firstName}
        ></CreateResourceFormInput>
        <CreateResourceFormLabel>Last Name</CreateResourceFormLabel>
        <CreateResourceFormInput
          type="text"
          aria-label="last-name"
          onChange={(e: FormEvent<HTMLInputElement>) =>
            setLastName(e.currentTarget.value)
          }
          value={lastName}
        ></CreateResourceFormInput>
        <CreateResourceFormLabel>Preferred Name</CreateResourceFormLabel>
        <CreateResourceFormInput
          type="text"
          aria-label="preferred-name"
          onChange={(e: FormEvent<HTMLInputElement>) =>
            setPreferredName(e.currentTarget.value)
          }
          value={preferredName}
        ></CreateResourceFormInput>
        <CreateResourceFormLabel>Title</CreateResourceFormLabel>
        <CreateResourceFormInput
          type="text"
          aria-label="title"
          onChange={(e: FormEvent<HTMLInputElement>) =>
            setTitle(e.currentTarget.value)
          }
          value={title}
        ></CreateResourceFormInput>
        <CreateResourceFormLabel>Department</CreateResourceFormLabel>
        <DepartmentSelect
          value={department?.id}
          aria-label="department-select"
          onChange={(event: ChangeEvent<HTMLSelectElement>) =>
            handleDepartmentInput(event)
          }
        >
          {departments.map((department: Department) => {
            return (
              <option key={department.id} value={department.id}>
                {department.name}
              </option>
            )
          })}
        </DepartmentSelect>
        <CreateResourceFormLabel>ImageUrl</CreateResourceFormLabel>
        <CreateResourceFormInput
          type="text"
          aria-label="image-url"
          onChange={(e: FormEvent<HTMLInputElement>) =>
            setImageUrl(e.currentTarget.value)
          }
          value={imageUrl}
        ></CreateResourceFormInput>
        <CreateResourceFormLabel>Email</CreateResourceFormLabel>
        <CreateResourceFormInput
          type="text"
          aria-label="email"
          onChange={(e: FormEvent<HTMLInputElement>) =>
            setEmail(e.currentTarget.value)
          }
          value={email}
        ></CreateResourceFormInput>
        <CreateResourceFormLabel>Start Date</CreateResourceFormLabel>
        <DatePicker
          selected={startDate}
          onChange={(date: Date) => setStartDate(date)}
        ></DatePicker>
        <CreateResourceFormLabel>
          Termination Date (Optional)
        </CreateResourceFormLabel>
        <DatePicker
          selected={terminationDate}
          onChange={(date: Date) => setTerminationDate(date)}
        ></DatePicker>
        {id ? (
          <SubmitButton
            name="Update"
            disabled={!hasFormChanged}
            onClick={updateExistingResource}
          >
            Update
          </SubmitButton>
        ) : (
          <SubmitButton name="Submit" onClick={createNewResource}>
            Submit
          </SubmitButton>
        )}
      </CreateResourceForm>
    </>
  )
}

export default ResourceForm
