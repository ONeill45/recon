import { ArgsType, Field } from 'type-graphql'

@ArgsType()
export class GetClientsWithFilter {
  @Field({ nullable: true })
  startDate: string

  @Field({ nullable: true })
  terminationDate: string

  @Field({ nullable: true })
  searchItem: string
}
