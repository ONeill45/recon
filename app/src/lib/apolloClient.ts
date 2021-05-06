/* istanbul ignore file */
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client'
import fetch from 'cross-fetch'

const client = new ApolloClient({
  link: new HttpLink({ uri: 'http://localhost:5000', fetch }),
  cache: new InMemoryCache(),
})

export default client
