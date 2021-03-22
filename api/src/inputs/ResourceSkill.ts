import { InputType, Field } from 'type-graphql'

@InputType()
export class ResourceSkillInput {
  @Field()
  resource: string

  @Field()
  skill: string

  @Field()
  skillValue: Number
}
