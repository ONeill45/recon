import { Query, Resolver, Arg } from 'type-graphql'
import { ProjectSkill } from '../models'

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
}
