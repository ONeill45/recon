import { InputType, Field } from 'type-graphql'

@InputType()
export class ProjectSkillInput {
  @Field()
  projectId: string

  @Field()
  skillId: string

  @Field()
  skillValue: Number
}
