import axios from 'axios'
import { useRouter } from 'next/router'
import React from 'react'

const NewClient = () => {
  const [clientName, setClientName] = React.useState('')
  const [description, setDescription] = React.useState('')
  const [logoUrl, setLogoUrl] = React.useState('')
  const [startDate, setStartDate] = React.useState('')
  const router = useRouter()

  const handleSubmit = (e) => {
    e.preventDefault()
    const createClient = async () => {
      await axios.post('http://localhost:5000', {
        query: `
        mutation CreateClient {
          createClient(data: { clientName: "${clientName}", description: "${description}", logoUrl: "${logoUrl}", startDate: "${startDate}", createdBy: "c66b4b9e-e4e1-4c64-91c1-24bccf4ec831", updatedBy: "c66b4b9e-e4e1-4c64-91c1-24bccf4ec831" }) {
            id
          }
        }
      `,
      })
    }
    try {
      createClient()
      router.push('/clients')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
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
