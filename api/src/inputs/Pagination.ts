import { InputType, Field } from 'type-graphql'

@InputType()
export class PaginationInput {
  @Field({ nullable: true })
  page: number

  @Field({ nullable: true })
  itemsPerPage: number
}
