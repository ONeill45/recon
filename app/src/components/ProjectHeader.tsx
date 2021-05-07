import { Project } from 'interfaces'
import {
  HeaderDescriptionDiv,
  HeaderDiv,
  HeaderNameDiv,
  SubHeaderDiv,
} from './Header'
import { Pencil } from './Pencil'

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
        <Pencil size={'30'} route={'/projects/project'} id={id} />
      </SubHeaderDiv>
    </HeaderDiv>
  )
}
