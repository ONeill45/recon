import { ClientCards } from '../components'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Client } from 'src/interfaces'

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
