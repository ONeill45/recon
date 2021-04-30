import { Entity, PrimaryGeneratedColumn, BaseEntity, Column } from 'typeorm'
import { ObjectType, Field, ID } from 'type-graphql'
import { SkillCategoryName } from './enums'

@Entity()
@ObjectType()
export class SkillCategory extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Field(() => String)
  @Column({
    name: 'skill_category_name',
    type: 'enum',
    enum: SkillCategoryName,
  })
  skillCategoryName: SkillCategoryName
}
