import { InputType, Field } from 'type-graphql'
import { SkillCategoryName } from '../models/enums/index'

@InputType()
export class SkillInput {
  @Field()
  skillName: string

  @Field()
  skillCategory: SkillCategoryName
}
