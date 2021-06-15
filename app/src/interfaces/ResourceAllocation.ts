import { Project, Resource, ResourceAssignment } from './'

export interface ResourceAllocation {
  id: string
  role: string
  roleId: string
  assignments: ResourceAssignment[]
  startDate: Date
  endDate: Date
  endReason: string
  percentage: number
  resource: Resource
  project: Project
  createdBy: string
  createdDate: Date
  updatedBy: string
  updatedDate: Date
  deletedBy: string
  deletedDate: Date
}
