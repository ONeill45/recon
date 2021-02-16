import { Query, Resolver, Mutation, Arg } from 'type-graphql'
import { Client } from '../models'
import { CreateClientInput } from '../inputs'

@Resolver()
export class ClientResolver {
  @Query(() => [Client])
  clients() {
    return Client.find()
  }

  @Mutation(() => Client)
  async createClient(@Arg('data') data: CreateClientInput) {
    const client = Client.create(data)
    await client.save()
    return client
  }
}
