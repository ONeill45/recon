import { Query, Resolver, Arg, Mutation } from 'type-graphql'
import { ResourceSkill, Resource, Skill } from '../models'
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
    const { resourceId, skillId } = data

    const resource = await Resource.findOne(resourceId)
    if (!resource) throw new Error(`Resource ${resourceId} not found!`)

    const skill = await Skill.findOne(skillId)
    if (!skill) throw new Error(`Skill ${skillId} not found!`)

    const resourceSkill = ResourceSkill.create({ resource, skill, ...data })
    await resourceSkill.save()
    return resourceSkill
  }
}
