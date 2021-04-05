import { Query, Resolver, Arg, Mutation } from 'type-graphql'
import { Skill } from '../models'
import { SkillInput } from '../inputs/Skill'

@Resolver()
export class SkillResolver {
  @Query(() => [Skill])
  skills() {
    return Skill.find()
  }

  @Query(() => Skill)
  skill(@Arg('id') id: string) {
    return Skill.findOne({ id })
  }

  @Mutation(() => Skill)
  async createSkill(@Arg('data') data: SkillInput) {
    const skill = Skill.create(data)
    await skill.save()
    return skill
  }
}
