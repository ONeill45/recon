import {
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
  JoinColumn,
  Column,
} from 'typeorm'
import { ObjectType, Field, ID } from 'type-graphql'
import { SkillCategory } from './'

@Entity()
@ObjectType()
export class Skill extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Field(() => String)
  @Column({ name: 'skill_name' })
  skillName: string

  @Field(() => SkillCategory)
  @ManyToOne(() => SkillCategory, { eager: true })
  @JoinColumn({ name: 'category_id' })
  skillCategory: string
}
