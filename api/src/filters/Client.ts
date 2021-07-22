import { ArgsType, Field } from 'type-graphql'
import { DateInput } from '../inputs/Date'

@ArgsType()
export class GetClientsWithFilter {
  @Field({ nullable: true })
  startDate: DateInput

  @Field({ nullable: true })
  endDate: DateInput

  @Field({ nullable: true })
  searchItem: string
}
