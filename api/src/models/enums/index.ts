/* eslint-disable no-unused-vars */
import { registerEnumType } from 'type-graphql'

export enum DepartmentNames {
  DATA = 'Data Analytics',
  DESIGN = 'Design',
  DEV = 'Development Services',
  DEVOPS = 'Development Operations',
  PMO = 'Project Management',
  QA = 'Quality Assurance',
}

registerEnumType(DepartmentNames, {
  name: 'DepartmentNames',
})

export enum ProjectType {
  HOURLY = 'hourly',
  FIXED = 'fixed bid',
  INTERNAL = 'internal',
}

registerEnumType(ProjectType, {
  name: 'ProjectType',
})

export enum Priority {
  HIGH = 'High',
  MEDIUM = 'Medium',
  LOW = 'Low',
}

registerEnumType(Priority, {
  name: 'Priority',
})
