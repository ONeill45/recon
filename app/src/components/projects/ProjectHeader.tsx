import { Project } from 'interfaces'
import {
  HeaderDescriptionDiv,
  HeaderDiv,
  HeaderNameDiv,
  SubHeaderDiv,
} from 'components/Header'
import { Pencil } from 'components/Pencil'

type ProjectHeaderProps = {
  project: Project
}

export const ProjectHeader: React.FC<ProjectHeaderProps> = ({ project }) => {
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
