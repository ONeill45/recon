export abstract class AuditableEntity {
  createdDate: Date
  createdBy: string
  updatedDate: Date
  updatedBy: string
  deletedDate: string | null
  deletedBy: string | null
}
