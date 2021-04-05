import {
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
  JoinColumn,
  Column,
} from 'typeorm'
import { ObjectType, Field, ID } from 'type-graphql'
import { Project, Skill } from './'

@Entity()
@ObjectType()
export class ProjectSkill extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Field(() => Project)
  @ManyToOne(() => Project, { eager: true })
  @JoinColumn({ name: 'project_id' })
  project: Project

  @Field(() => Skill)
  @ManyToOne(() => Skill, { eager: true })
  @JoinColumn({ name: 'skill_id' })
  skill: Skill

  @Field(() => Number)
  @Column({ name: 'skill_value' })
  skillValue: Number
}
