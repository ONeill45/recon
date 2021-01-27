import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { ObjectType, Field, ID } from 'type-graphql'

@Entity()
@ObjectType()
export class Resource extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Field(() => String)
  @Column({ name: 'first_name', nullable: true })
  firstName: string

  @Field(() => String)
  @Column({ name: 'last_name' })
  lastName: string

  @Field(() => String)
  @Column({ name: 'preferred_name', nullable: true })
  preferredName: string

  @Field(() => String)
  @Column()
  title: string

  @Field(() => Date)
  @Column({ name: 'start_date' })
  startDate: Date

  @Field(() => Date)
  @Column({ name: 'termination_date', nullable: true })
  terminationDate: Date | null
}
