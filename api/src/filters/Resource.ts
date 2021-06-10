import { ArgsType, Field } from 'type-graphql'
import { DateInput } from '../inputs/Date'
import { PaginationInput } from '../inputs/Pagination'

@ArgsType()
export class GetResourcesWithFilter {
  @Field({ nullable: true })
  searchItem: string | null

  @Field(() => [String], { nullable: true })
  clients: Array<string | null>

  @Field(() => [String], { nullable: true })
  title: Array<string | null>

  @Field(() => [String], { nullable: true })
  departmentName: Array<string | null>

  @Field(() => [String], { nullable: true })
  project: Array<string | null>

  @Field({ nullable: true })
  startDate: DateInput

  @Field({ nullable: true })
  endDate: DateInput

  @Field({ nullable: true })
  pagination: PaginationInput
}
