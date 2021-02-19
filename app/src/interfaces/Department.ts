import { DepartmentNames } from './'

export interface Department {
  id: string
  name: DepartmentNames
  createdBy: string
  createdDate: Date
  updatedBy: string
  updatedDate: Date
  deletedBy: string
  deletedDate: Date
}
