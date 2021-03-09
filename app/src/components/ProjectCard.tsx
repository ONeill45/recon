import { useRouter } from 'next/router'

import { Project } from 'interfaces'
import { getRelativeTime } from '../utils'
import { CardDescriptionDiv, CardDiv, CardNameDiv } from './Card'

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
  const router = useRouter()
  const relativeTime = getRelativeTime(startDate, endDate)
  return (
    <CardDiv
      clickable={true}
      onClick={() => router.push({ pathname: '/projects/[id]', query: { id } })}
    >
      <CardNameDiv>{projectName}</CardNameDiv>
      <CardDescriptionDiv>{clientName}</CardDescriptionDiv>
      <CardDescriptionDiv>{projectType}</CardDescriptionDiv>
      <CardDescriptionDiv color="grey">{relativeTime}</CardDescriptionDiv>
    </CardDiv>
  )
}
