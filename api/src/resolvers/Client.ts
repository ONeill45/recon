import { Query, Resolver, Mutation, Arg, Args } from 'type-graphql'
import { Client } from '../models'
import { CreateClientInput, UpdateClientInput } from '../inputs'
import { GetClientsWithFilter } from '../filters'
import { LessThan, MoreThan, Equal, ILike } from 'typeorm'
import { format } from 'date-fns'

@Resolver()
export class ClientResolver {
  @Query(() => [Client])
  clients(@Args() filter: GetClientsWithFilter) {
    const where: { [key: string]: any } = {}
    let textSearchWhere: Array<{ [key: string]: any }> = [
      {
        clientName: ILike(`${filter.searchItem}%`),
      },
      {
        description: ILike(`${filter.searchItem}%`),
      },
    ]

    if (filter?.startDate) {
      if (filter.startDate.beforeAfter === 'before') {
        where.startDate = LessThan(
          format(new Date(filter.startDate.date), 'yyyy-MM-dd'),
        )
      } else if (filter.startDate.beforeAfter === 'after') {
        where.startDate = MoreThan(
          format(new Date(filter.startDate.date), 'yyyy-MM-dd'),
        )
      } else {
        where.startDate = Equal(
          format(new Date(filter.startDate.date), 'yyyy-MM-dd'),
        )
      }
    }

    if (filter?.endDate) {
      if (filter.endDate.beforeAfter === 'before') {
        where.endDate = LessThan(
          format(new Date(filter.endDate.date), 'yyyy-MM-dd'),
        )
      } else if (filter.endDate.beforeAfter === 'after') {
        where.endDate = MoreThan(
          format(new Date(filter.endDate.date), 'yyyy-MM-dd'),
        )
      } else {
        where.endDate = Equal(
          format(new Date(filter.endDate.date), 'yyyy-MM-dd'),
        )
      }
    }
    // if (filter?.searchItem) {
    //   where.push({ clientName: ILike(`${filter.searchItem}%`) })
    //   where.push({ description: ILike(`${filter.searchItem}%`) })
    // }

    let updatedWhere = []
    if (Object.keys(where).length > 0) {
      updatedWhere = textSearchWhere.map((field: any) => {
        Object.entries(where).map((item: any) => {
          field[item[0]] = item[1]
        })
        return field
      })
      textSearchWhere = textSearchWhere.concat(updatedWhere)
    }

    const query: any = {}

    if (Object.keys(filter).length !== 0) {
      query.where = textSearchWhere
    }

    return Client.find(query)
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
