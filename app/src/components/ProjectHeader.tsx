import { Project } from 'interfaces'
import {
  HeaderDescriptionDiv,
  HeaderDiv,
  HeaderNameDiv,
  SubHeaderDiv,
  PencilIcon,
} from './Header'
import Link from 'next/link'

type ProjectHeaderProps = {
  project: Project
}

export const ProjectHeader = ({ project }: ProjectHeaderProps) => {
  const { projectName, id } = project

  return (
    <HeaderDiv>
      <SubHeaderDiv>
        <HeaderNameDiv>{projectName}</HeaderNameDiv>
        <HeaderDescriptionDiv>Project Manager: Some Guy</HeaderDescriptionDiv>
        <Link href={`/projects/update/${id}`}>
          <PencilIcon src="/images/pencil.png" />
        </Link>
      </SubHeaderDiv>
    </HeaderDiv>
  )
}
