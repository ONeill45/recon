import { useRouter } from 'next/router'
import React from 'react'
import { gql, useMutation } from '@apollo/client'
import styled from '@emotion/styled'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

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

const DateInputDiv = styled.div`
  z-index: 1;
`

export const NewClientForm = () => {
  const [clientName, setClientName] = React.useState('')
  const [description, setDescription] = React.useState('')
  const [logoUrl, setLogoUrl] = React.useState('')
  const [startDate, setStartDate] = React.useState(new Date())
  const [endDate, setEndDate] = React.useState<Date | null>(null)
  const router = useRouter()

  const nullEndDateChecker = (date: Date | null) => {
    if (date) return `endDate: "${date}",`
    return ''
  }

  const [createClient] = useMutation(gql`
  mutation CreateClient {
    createClient(data: { 
      clientName: "${clientName}", 
      description: "${description}", 
      logoUrl: "${logoUrl}", 
      startDate: "${startDate}", 
      ${nullEndDateChecker(endDate)}
      createdBy: "c66b4b9e-e4e1-4c64-91c1-24bccf4ec831", 
      updatedBy: "c66b4b9e-e4e1-4c64-91c1-24bccf4ec831", 
    }) {
      id
    }
  }
  `)

  return (
    <>
      <CreateClientForm
        onSubmit={async (e) => {
          e.preventDefault()
          await createClient()
          router.push('/clients')
        }}
      >
        <CreateClientFormLabel>
          Client Name
          <CreateClientFormInput
            type="text"
            name="clientName"
            onChange={(e) => setClientName(e.target.value)}
          />
        </CreateClientFormLabel>
        <CreateClientFormLabel>
          Description
          <CreateClientFormInput
            type="text"
            name="description"
            onChange={(e) => setDescription(e.target.value)}
          />
        </CreateClientFormLabel>
        <CreateClientFormLabel>
          Logo Url (Optional)
          <CreateClientFormInput
            type="text"
            name="logoUrl"
            onChange={(e) => setLogoUrl(e.target.value)}
          />
        </CreateClientFormLabel>
        <CreateClientFormLabel>
          Start Date
          <DateInputDiv>
            <DatePicker
              name="startDate"
              selected={startDate}
              onChange={(date: Date) => setStartDate(date)}
            />
          </DateInputDiv>
        </CreateClientFormLabel>
        <CreateClientFormLabel>
          End Date (Optional)
          <DateInputDiv>
            <DatePicker
              name="endDate"
              selected={endDate}
              onChange={(date: Date) => setEndDate(date)}
            />
          </DateInputDiv>
        </CreateClientFormLabel>
        <CreateClientFormInput type="submit" value="Submit" />
      </CreateClientForm>
    </>
  )
}
