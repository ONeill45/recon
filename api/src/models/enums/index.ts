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
