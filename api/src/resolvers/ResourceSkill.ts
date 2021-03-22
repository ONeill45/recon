import { Query, Resolver, Arg, Mutation } from 'type-graphql'
import { ResourceSkill } from '../models'
import { ResourceSkillInput } from '../inputs/ResourceSkill'

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

  @Mutation(() => ResourceSkill)
  async createResourceSkill(@Arg('data') data: ResourceSkillInput) {
    const resourceSkill = ResourceSkill.create(data)
    await resourceSkill.save()
    return resourceSkill
  }
}
