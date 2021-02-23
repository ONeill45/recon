import { registerEnumType } from 'type-graphql'

export enum ProjectType {
  HOURLY = 'hourly',
  FIXED = 'fixed bid',
  INTERNAL = 'internal',
}

registerEnumType(ProjectType, {
  name: 'ProjectType',
})
