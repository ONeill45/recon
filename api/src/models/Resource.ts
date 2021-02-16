import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  DeleteDateColumn,
  CreateDateColumn,
} from 'typeorm'
import { ObjectType, Field, ID } from 'type-graphql'
import { AuditableEntity } from './AuditableEntity'
import { DepartmentNames } from './'

@Entity()
@ObjectType()
export class Resource extends BaseEntity implements AuditableEntity {
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
  preferredName: string | null

  @Field(() => String)
  @Column()
  title: string

  @Field(() => String)
  @Column({
    type: 'enum',
    enum: DepartmentNames,
    unique: true,
  })
  department: DepartmentNames

  @Field(() => String, { nullable: true })
  @Column({ name: 'image_url', nullable: true })
  imageUrl: string | null

  @Field(() => Date)
  @Column({ name: 'start_date' })
  startDate: Date

  @Field(() => Date, { nullable: true })
  @Column({ name: 'termination_date', nullable: true })
  terminationDate: Date | null

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
