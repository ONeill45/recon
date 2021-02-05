import { useRouter } from 'next/router'
import React from 'react'
import { gql, useMutation } from '@apollo/client'

const NewClient = () => {
  const [clientName, setClientName] = React.useState('')
  const [description, setDescription] = React.useState('')
  const [logoUrl, setLogoUrl] = React.useState('')
  const [startDate, setStartDate] = React.useState('')
  const router = useRouter()

  const [createClient] = useMutation(gql`
  mutation CreateClient {
    createClient(data: { clientName: "${clientName}", description: "${description}", logoUrl: "${logoUrl}", startDate: "${startDate}", createdBy: "c66b4b9e-e4e1-4c64-91c1-24bccf4ec831", updatedBy: "c66b4b9e-e4e1-4c64-91c1-24bccf4ec831" }) {
      id
    }
  }
  `)

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          createClient({
            variables: { clientName, description, logoUrl, startDate },
          })
          router.push('/clients')
        }}
      >
        <label>
          Client Name:
          <input
            type="text"
            name="clientName"
            onChange={(e) => setClientName(e.target.value)}
          />
        </label>
        <label>
          Description:
          <input
            type="text"
            name="description"
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <label>
          Logo Url:
          <input
            type="text"
            name="logoUrl"
            onChange={(e) => setLogoUrl(e.target.value)}
          />
        </label>
        <label>
          Start Date:
          <input
            type="text"
            name="startDate"
            onChange={(e) => setStartDate(e.target.value)}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  )
}

export default NewClient
