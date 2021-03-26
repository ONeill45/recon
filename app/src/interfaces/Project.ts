import { ProjectType, Priority } from './Enum'
import { Client, ResourceAllocation } from './'
export interface Project {
  id: string
  projectName: string
  client: Client
  startDate: Date
  endDate: Date
  projectType: ProjectType
  confidence: number
  priority: Priority
  resourceAllocations: ResourceAllocation[]
  createdBy: string
  createdDate: Date
  updatedBy: string
  updatedDate: Date
  deletedBy: string
  deletedDate: Date
}
