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

  @Field({ nullable: true })
  imageUrl?: string

  @Field()
  departmentId: string

  @Field()
  email: string

  @Field()
  startDate: Date

  @Field({ nullable: true })
  terminationDate: Date

  @Field()
  createdBy: string

  @Field()
  updatedBy: string
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

  @Field({ nullable: true })
  imageUrl?: string

  @Field()
  departmentId?: string

  @Field()
  email?: string

  @Field()
  startDate?: Date

  @Field({ nullable: true })
  terminationDate?: Date

  @Field()
  updatedBy: string
}
