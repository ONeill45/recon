import { Department } from './'

export interface Resource {
  id: string
  firstName: string
  lastName: string
  preferredName: string
  title: string
  department: Department
  imageUrl: string
  email: string
  startDate: Date
  terminationDate: Date
  createdBy: string
  createdDate: Date
  updatedBy: string
  updatedDate: Date
  deletedBy: string
  deletedDate: Date
}
