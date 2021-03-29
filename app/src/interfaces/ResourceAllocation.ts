import { Project, Resource } from './'

export interface ResourceAllocation {
  id: string
  startDate: Date
  endDate: Date
  endReason: String
  percentage: Number
  resource: Resource
  project: Project
  createdBy: string
  createdDate: Date
  updatedBy: string
  updatedDate: Date
  deletedBy: string
  deletedDate: Date
}