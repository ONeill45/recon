import 'reflect-metadata'
import { ApolloServer } from 'apollo-server'
import { buildSchema } from 'type-graphql'

import { connect } from './database'
import {
  ClientResolver,
  ResourceResolver,
  ResourceAllocationResolver,
  ProjectResolver,
} from './resolvers'

export const createSchema = async () =>
  buildSchema({
    resolvers: [
      ClientResolver,
      ResourceResolver,
      ResourceAllocationResolver,
      ProjectResolver,
    ],
  })

async function main() {
  await connect()

  const server = new ApolloServer({ schema: await createSchema() })
  await server.listen(process.env.PORT)
  console.log('Server has started!')
}

main()
