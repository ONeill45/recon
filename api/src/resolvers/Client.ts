import { Query, Resolver, Mutation, Arg } from 'type-graphql'
import { Client } from '../models'
import { CreateClientInput, UpdateClientInput } from '../inputs'

@Resolver()
export class ClientResolver {
  @Query(() => [Client])
  clients() {
    return Client.find()
  }

  @Query(() => Client)
  client( @Arg('id') id: string) {
    return Client.findOne({id:id})
  }

  @Mutation(() => Client)
  async updateClient(
    @Arg('id') id: string,
    @Arg('data') data: UpdateClientInput,
  ) {
    const client = await Client.findOne({ where: { id } })
    if (!client) throw new Error(`Client ${id} not found!`)
    Object.assign(client, data)
    await client.save()
    return client
  }

  @Mutation(() => Client)
  async createClient(@Arg('data') data: CreateClientInput) {
    const client = Client.create(data)
    await client.save()
    return client
  }
}
