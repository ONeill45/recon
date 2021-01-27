import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { ObjectType, Field, ID } from 'type-graphql'
import { AuditableEntity } from './AuditableEntity'

@Entity()
@ObjectType()
export class Client extends AuditableEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Field(() => String)
  @Column({ name: 'client_name' })
  clientName: string

  @Field(() => String)
  @Column()
  description: string

  @Field(() => String)
  @Column({ name: 'logo_url', nullable: true })
  preferredName: string

  @Field(() => String)
  @Column()
  title: string

  @Field(() => Date)
  @Column({ name: 'start_date' })
  startDate: Date

  @Field(() => Date)
  @Column({ name: 'end_date', nullable: true })
  endDate: Date | null
}
