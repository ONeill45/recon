import { Query, Resolver, Arg, Mutation } from 'type-graphql'
import { ProjectSkill } from '../models'
import { ProjectSkillInput } from '../inputs/ProjectSkill'

@Resolver()
export class ProjectSkillResolver {
  @Query(() => [ProjectSkill])
  projectSkills() {
    return ProjectSkill.find()
  }

  @Query(() => ProjectSkill)
  projectSkill(@Arg('id') id: string) {
    return ProjectSkill.findOne({ id })
  }

  @Mutation(() => ProjectSkill)
  async createProjectSkill(@Arg('data') data: ProjectSkillInput) {
    const projectSkill = ProjectSkill.create(data)
    await projectSkill.save()
    return projectSkill
  }
}
