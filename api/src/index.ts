import 'reflect-metadata'
import { ApolloServer } from 'apollo-server'
import { buildSchema } from 'type-graphql'

import { connect } from './database'
import {
  ClientResolver,
  ResourceResolver,
  ProjectResolver,
  SkillResolver,
  SkillCategoryResolver,
  ResourceSkillResolver,
  ProjectSkillResolver,
  DepartmentResolver,
} from './resolvers'

export const createSchema = async () =>
  buildSchema({
    resolvers: [
      ClientResolver,
      ResourceResolver,
      ProjectResolver,
      SkillResolver,
      SkillCategoryResolver,
      ResourceSkillResolver,
      ProjectSkillResolver,
      DepartmentResolver,
    ],
  })

async function main() {
  await connect()

  const server = new ApolloServer({ schema: await createSchema() })
  await server.listen(process.env.PORT)
  // eslint-disable-next-line no-console
  console.log('Server has started!')
}

main()
