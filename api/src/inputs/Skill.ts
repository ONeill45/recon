import { InputType, Field } from 'type-graphql'
@InputType()
export class SkillInput {
  @Field()
  skillName: string

  @Field()
  skillCategoryId: string
}
