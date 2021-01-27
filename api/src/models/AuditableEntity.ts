import { Field } from 'type-graphql'
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
} from 'typeorm'

export abstract class AuditableEntity extends BaseEntity {
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
  @DeleteDateColumn({ name: 'deleted_date' })
  deletedDate: string

  @Field(() => String)
  @Column({ name: 'updated_by' })
  deletedBy: string
}
