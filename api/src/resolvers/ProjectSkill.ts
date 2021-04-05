import { Query, Resolver, Arg, Mutation } from 'type-graphql'
import { ProjectSkill, Project, Skill } from '../models'
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
    const { projectId, skillId } = data

    const project = await Project.findOne(projectId)
    if (!project) throw new Error(`Project ${projectId} not found!`)

    const skill = await Skill.findOne(skillId)
    if (!skill) throw new Error(`Skill ${skillId} not found!`)

    const projectSkill = ProjectSkill.create({ project, skill, ...data })
    await projectSkill.save()
    return projectSkill
  }
}
