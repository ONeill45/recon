import { Project } from 'interfaces'
import {
  HeaderDescriptionDiv,
  HeaderDiv,
  HeaderNameDiv,
  SubHeaderDiv,
} from './Header'

type ProjectHeaderProps = {
  project: Project
}

export const ProjectHeader = ({ project }: ProjectHeaderProps) => {
  const { projectName } = project

  return (
    <HeaderDiv>
      <SubHeaderDiv>
        <HeaderNameDiv>{projectName}</HeaderNameDiv>
        <HeaderDescriptionDiv>Project Manager: Some Guy</HeaderDescriptionDiv>
      </SubHeaderDiv>
    </HeaderDiv>
  )
}
