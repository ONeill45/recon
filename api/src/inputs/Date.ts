import { InputType, Field } from 'type-graphql'

@InputType()
export class DateInput {
  @Field({ nullable: true })
  date: string

  @Field({ nullable: true })
  beforeAfter?: string
}
