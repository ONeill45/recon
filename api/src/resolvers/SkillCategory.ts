import { Query, Resolver, Arg, Mutation } from 'type-graphql'
import { SkillCategoryInput } from '../inputs/SkillCategory'
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

  @Mutation(() => SkillCategory)
  async createSkillCategory(@Arg('data') data: SkillCategoryInput) {
    const skillCategory = SkillCategory.create(data)
    await skillCategory.save()
    return skillCategory
  }
}
