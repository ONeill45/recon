import { Query, Resolver, Arg } from 'type-graphql'
import { SkillCategory } from '../models'

@Resolver()
export class SkillCategoryResolver {
  @Query(() => [SkillCategory])
  skillCategories() {
    return SkillCategory.find()
  }

  @Query(() => SkillCategory)
  skillCategory(@Arg('id') id: string) {
    return SkillCategory.findOne({ id })
  }
}
