import { Query, Resolver } from 'type-graphql'
import { Client } from '../models'

@Resolver()
export class ClientResolver {
  @Query(() => [Client])
  clients() {
    return Client.findAndCount()
  }
}
