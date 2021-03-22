import { InputType, Field } from 'type-graphql'

@InputType()
export class ProjectSkillInput {
  @Field()
  project: string

  @Field()
  skill: string

  @Field()
  skillValue: Number
}
