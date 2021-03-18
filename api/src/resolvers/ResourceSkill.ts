import { Query, Resolver, Arg } from 'type-graphql'
import { ResourceSkill } from '../models'

@Resolver()
export class ResourceSkillResolver {
  @Query(() => [ResourceSkill])
  resourceSkills() {
    return ResourceSkill.find()
  }

  @Query(() => ResourceSkill)
  resourceSkill(@Arg('id') id: string) {
    return ResourceSkill.findOne({ id })
  }
}
