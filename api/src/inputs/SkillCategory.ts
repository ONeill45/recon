import { InputType, Field } from 'type-graphql'

@InputType()
export class SkillCategoryInput {
  @Field()
  skillCategoryName: string
}
