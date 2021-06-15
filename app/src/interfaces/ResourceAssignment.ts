import { Resource, ResourceAllocation } from './'

export interface ResourceAssignment {
  id: string
  resource: Resource
  resourceAllocation: ResourceAllocation
  startDate: Date
  endDate: Date
  endReason: String
  percentage: Number
  createdBy: string
  createdDate: Date
  updatedBy: string
  updatedDate: Date
  deletedBy: string
  deletedDate: Date
}
