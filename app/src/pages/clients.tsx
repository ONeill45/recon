import { ClientCard } from 'src/components'
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

type ClientsProps = {
  clients: Client[]
}

const Clients = () => {
  // console.log('clients', data)
  // const data = {
  //   something: 'here',
  // }
  const [clients, setClients] = useState<Client[]>([])

  useEffect(() => {
    const getClients = async () => {
      const { data } = await axios.post('http://localhost:5000', {
        query: GET_ALL_CLIENTS,
      })
      // const apollo = new ApolloClient({
      //   uri: 'https://localhost:5000/graphql',
      //   cache: new InMemoryCache(),
      // })

      // const data = await apollo.query<{
      //   clients: Client[]
      // }>({
      //   query: GET_ALL_CLIENTS,
      // })
      setClients(data.data.clients)
    }

    getClients()
  }, [])

  return (
    <>
      {clients.map((client) => {
        return <ClientCard client={client}></ClientCard>
      })}

      <div>{JSON.stringify(clients)}</div>
    </>
  )
}

// export async function getStaticProps() {
//   return {
//     props: {
//       clients: data,
//     },
//   }
// }
export default Clients
