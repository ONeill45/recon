import { Project } from 'interfaces'
import { getDurationText } from '../utils'
import {
  CardDescriptionDiv,
  CardDetailsDiv,
  CardDiv,
  CardDurationDiv,
  CardNameDiv,
} from './Card'

type ProjectCardProps = {
  project: Project
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
  const {
    projectName,
    client,
    // projectType,
    // confidence,
    // priority,
    startDate,
    endDate,
  } = project

  const duration = getDurationText(startDate, endDate)
  return (
    <CardDiv>
      <CardDetailsDiv>
        <CardNameDiv>{projectName}</CardNameDiv>
        <CardDescriptionDiv>{client.clientName}</CardDescriptionDiv>
        <CardDurationDiv>{duration}</CardDurationDiv>
      </CardDetailsDiv>
    </CardDiv>
  )
}
