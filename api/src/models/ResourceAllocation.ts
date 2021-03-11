import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  DeleteDateColumn,
  CreateDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm'
import { ObjectType, Field, ID } from 'type-graphql'
import { AuditableEntity } from './AuditableEntity'
import { Project, Resource } from './'

@Entity()
@ObjectType()
export class ResourceAllocation extends BaseEntity implements AuditableEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Field(() => Resource)
  @ManyToOne(() => Resource)
  @JoinColumn({ name: 'resource_id' })
  resource: Resource

  @Field(() => Project)
  @ManyToOne(() => Project, { eager: true })
  @JoinColumn({ name: 'project_id' })
  project: Project

  @Field(() => Date)
  @Column({ name: 'start_date' })
  startDate: Date

  @Field(() => Date, { nullable: true })
  @Column({ name: 'end_date', nullable: true })
  endDate: Date | null

  @Field(() => String, { nullable: true })
  @Column({ name: 'end_reason', nullable: true })
  endReason: String | null

  @Field(() => Number)
  @Column({ name: 'percentage' })
  percentage: Number

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
