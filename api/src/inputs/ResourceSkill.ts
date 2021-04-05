import { InputType, Field } from 'type-graphql'
@InputType()
export class ResourceSkillInput {
  @Field()
  resourceId: string

  @Field()
  skillId: string

  @Field()
  skillValue: Number
}
