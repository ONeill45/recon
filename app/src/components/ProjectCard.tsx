import React from 'react'

import { Project } from 'interfaces'
import { getRelativeTime } from '../utils'
import { Card, CardDescriptionDiv, CardNameDiv } from './Card'

type ProjectCardProps = {
  project: Project
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
  const {
    id,
    projectName,
    client: { clientName },
    projectType,
    startDate,
    endDate,
  } = project
  const relativeTime = getRelativeTime(startDate, endDate)
  return (
    <Card link={`/projects/${id}`}>
      <CardNameDiv>{projectName}</CardNameDiv>
      <CardDescriptionDiv>{clientName}</CardDescriptionDiv>
      <CardDescriptionDiv>{projectType}</CardDescriptionDiv>
      <CardDescriptionDiv color="grey">{relativeTime}</CardDescriptionDiv>
    </Card>
  )
}
