import { InputType, Field } from 'type-graphql'

@InputType()
export class CreateResourceInput {
  @Field()
  firstName: string

  @Field()
  lastName: string

  @Field({ nullable: true })
  preferredName?: string

  @Field()
  title: string

  @Field()
  startDate: Date
}

@InputType()
export class UpdateResourceInput {
  @Field()
  firstName?: string

  @Field()
  lastName?: string

  @Field({ nullable: true })
  preferredName?: string

  @Field()
  title?: string

  @Field()
  startDate?: Date

  @Field({ nullable: true })
  terminationDate?: Date
}
