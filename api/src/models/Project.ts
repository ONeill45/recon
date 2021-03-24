import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  DeleteDateColumn,
  CreateDateColumn,
  BaseEntity,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm'
import { ObjectType, Field, ID } from 'type-graphql'
import { AuditableEntity } from './AuditableEntity'
import { Priority, ProjectType } from './enums'
import { Client, ResourceAllocation } from './'

@Entity()
@ObjectType()
export class Project extends BaseEntity implements AuditableEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Field(() => String)
  @Column({ name: 'project_name' })
  projectName: string

  @Field(() => Client)
  @ManyToOne(() => Client, { eager: true })
  @JoinColumn({ name: 'client_id' })
  client: string

  @Field(() => Date)
  @Column({ name: 'start_date' })
  startDate: Date

  @Field(() => Date, { nullable: true })
  @Column({ name: 'end_date', nullable: true })
  endDate: Date | null

  @Field(() => String)
  @Column({ name: 'project_type', type: 'enum', enum: ProjectType })
  projectType: ProjectType

  @Field(() => Number)
  @Column({ name: 'confidence' })
  confidence: Number

  @Field(() => String)
  @Column({
    name: 'priority',
    type: 'enum',
    enum: Priority,
    default: Priority.HIGH,
  })
  priority: string

  @Field(() => [ResourceAllocation])
  @OneToMany(() => ResourceAllocation, (ra) => ra.project)
  resourceAllocations: ResourceAllocation[]

  @Field(() => Date)
  @CreateDateColumn({ name: 'created_date' })
  createdDate: Date

  @Field(() => String)
  @Column({ name: 'created_by' })
  createdBy: string

  @Field(() => Date)
  @UpdateDateColumn({ name: 'updated_date' })
  updatedDate: Date

  @Field(() => String)
  @Column({ name: 'updated_by' })
  updatedBy: string

  @Field(() => Date)
  @DeleteDateColumn({ name: 'deleted_date', nullable: true })
  deletedDate: string | null

  @Field(() => String)
  @Column({ name: 'deleted_by', nullable: true })
  deletedBy: string | null
}
