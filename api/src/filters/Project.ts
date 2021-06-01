import { ArgsType, Field } from 'type-graphql'
import { DateInput } from '../inputs/Date'

@ArgsType()
export class GetProjectsWithFilter {
  @Field(() => [String], { nullable: true })
  projectTypes: Array<string | null>

  @Field(() => [String], { nullable: true })
  clientNames: Array<string | null>

  @Field(() => [String], { nullable: true })
  priorities: Array<string | null>

  @Field({ nullable: true })
  confidence: string

  @Field({ nullable: true })
  startDate: DateInput

  @Field({ nullable: true })
  endDate: DateInput
}
