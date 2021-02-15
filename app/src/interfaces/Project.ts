import { ProjectType } from './Enum'

export interface Project {
  id: string
  projectName: string
  clientId: string
  logoUrl: string
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
