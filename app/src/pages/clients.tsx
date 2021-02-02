import { ClientCard, ClientCards } from 'src/components'
import axios from 'axios'
import { useEffect, useState } from 'react'

const GET_ALL_CLIENTS = `
  {
    clients {
      id
      clientName
      description
      logoUrl
      startDate
      endDate
    }
  }
`

type Client = {
  id: string
  clientName: string
  description: string
  logoUrl: string
  startDate: Date
  endDate: Date
}

const Clients = () => {
  const [clients, setClients] = useState<Client[]>([])

  useEffect(() => {
    const getClients = async () => {
      const { data } = await axios.post('http://localhost:5000', {
        query: GET_ALL_CLIENTS,
      })
      setClients(data.data.clients)
    }

    getClients()
  }, [])

  return <ClientCards clients={clients}></ClientCards>
}

export default Clients
