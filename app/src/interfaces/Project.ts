import { ProjectType } from './Enum'
import { Client } from './'
export interface Project {
  id: string
  projectName: string
  client: Client
  startDate: Date
  endDate: Date
  ProjectType: ProjectType
  confidence: number
  priority: number
  createdBy: string
  createdDate: Date
  updatedBy: string
  updatedDate: Date
  deletedBy: string
  deletedDate: Date
}
