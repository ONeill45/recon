import { InputType, Field } from 'type-graphql'

@InputType()
export class CreateClientInput {
  @Field()
  clientName: string

  @Field()
  description: string

  @Field({ nullable: true })
  logoUrl?: string

  @Field()
  startDate: Date

  @Field({ nullable: true })
  endDate?: Date

  @Field()
  createdBy: string

  @Field()
  updatedBy: string
}
