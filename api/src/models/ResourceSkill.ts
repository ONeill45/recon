import {
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm'
import { ObjectType, Field, ID } from 'type-graphql'
import { Resource, Skill } from '.'

@Entity()
@ObjectType()
export class ResourceSkill extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Field(() => Resource)
  @ManyToOne(() => Resource, { eager: true })
  @JoinColumn({ name: 'resource_id' })
  resource: string

  @Field(() => Skill)
  @ManyToOne(() => Skill, { eager: true })
  @JoinColumn({ name: 'skill_id' })
  skill: string

  @Field(() => String)
  @Column({ name: 'skill_value' })
  skillValue: Number
}
