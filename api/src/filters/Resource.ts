import { ArgsType, Field } from 'type-graphql'

@ArgsType()
export class GetResourcesWithFilter {
  @Field({ nullable: true })
  clients: string

  @Field({ nullable: true })
  title: string

  @Field({ nullable: true })
  startDate: string

  @Field({ nullable: true })
  terminationDate: string

  @Field({ nullable: true })
  departmentName: string

  @Field({ nullable: true })
  project: string

  @Field({ nullable: true })
  skills: string
}
