import { InputType, Field } from 'type-graphql'
import { SkillCategoryName } from '../models/enums'
@InputType()
export class SkillCategoryInput {
  @Field()
  skillCategoryName: SkillCategoryName
}
