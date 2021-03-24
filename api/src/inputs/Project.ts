import { InputType, Field } from 'type-graphql'
import { Priority, ProjectType } from '../models/enums'

@InputType()
export class CreateProjectInput {
  @Field()
  projectName: string

  @Field()
  client: string

  @Field()
  startDate: Date

  @Field({ nullable: true })
  endDate?: Date

  @Field()
  projectType: ProjectType

  @Field()
  priority: Priority

  @Field()
  confidence: number

  @Field()
  createdBy: string

  @Field()
  updatedBy: string
}

@InputType()
export class UpdateProjectInput {
  @Field()
  projectName: string

  @Field()
  client: string

  @Field()
  startDate: Date

  @Field({ nullable: true })
  endDate?: Date

  @Field()
  projectType: ProjectType

  @Field()
  priority: Priority

  @Field()
  confidence: number

  @Field()
  updatedBy: string
}
