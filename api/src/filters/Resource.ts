import { ArgsType, Field } from 'type-graphql'
import { DateInput } from '../inputs/Date'

@ArgsType()
export class GetResourcesWithFilter {
  @Field({ nullable: true })
  searchItem: string

  @Field(() => [String], { nullable: true })
  clients: Array<string | null>

  // @Field({ nullable: true })
  // clients: string

  @Field(() => [String], { nullable: true })
  title: Array<string | null>

  // @Field({ nullable: true })
  // title: string

  @Field(() => [String], { nullable: true })
  departmentName: Array<string | null>

  // @Field({ nullable: true })
  // departmentName: string

  @Field(() => [String], { nullable: true })
  project: Array<string | null>

  // @Field({ nullable: true })
  // project: string

  @Field(() => [String], { nullable: true })
  skills: Array<string | null>

  // @Field({ nullable: true })
  // skills: string

  @Field({ nullable: true })
  startDate: DateInput

  @Field({ nullable: true })
  terminationDate: DateInput
}
