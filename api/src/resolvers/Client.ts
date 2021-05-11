import { Query, Resolver, Mutation, Arg, Args } from 'type-graphql'
import { LessThan, ILike, MoreThan, getRepository } from 'typeorm'
import { Client } from '../models'
import { CreateClientInput, UpdateClientInput } from '../inputs'
import { GetClientsWithFilter } from '../filters'

@Resolver()
export class ClientResolver {
  @Query(() => [Client])
  clients(@Args() filter: GetClientsWithFilter) {
    const where = []

    // if (filter?.startDate) {
    //   where.startDate = LessThan(new Date(filter.startDate))
    // }
    // if (filter?.terminationDate) {
    //   where.startDate = MoreThan(new Date(filter.terminationDate))
    // }
    if (filter?.searchItem) {
      where.push({ clientName: ILike(`${filter.searchItem}%`) })
      where.push({ description: ILike(`${filter.searchItem}%`) })
    }
    return Client.find({ where })
  }

  @Query(() => Client, { nullable: true })
  client(@Arg('id') id: string): Promise<Client | null> {
    return Client.findOne({ id })
  }

  @Mutation(() => Client)
  async updateClient(
    @Arg('id') id: string,
    @Arg('data') data: UpdateClientInput,
  ) {
    const client = await Client.findOne({ id })
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
