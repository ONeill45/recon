import { Query, Resolver, Arg } from 'type-graphql'
import { Skill } from '../models'

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
}
