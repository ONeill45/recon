import { Entity, PrimaryGeneratedColumn, BaseEntity, Column } from 'typeorm'
import { ObjectType, Field, ID } from 'type-graphql'

@Entity()
@ObjectType()
export class SkillCategory extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Field(() => String)
  @Column({ name: 'skill_category_name' })
  skillCategoryName: string
}
