import { Resource } from 'interfaces'
import { Sections } from 'components/Sections'
import { Histogram, Skills } from 'components/Histogram'
import { ProjectAllocation } from 'components/projects/ProjectAllocation'
import { ResourceDetails } from 'components/ResourceDetails'
import { SectionContainer, Section, SectionTitle } from 'components/Section'

type ResourceDetailCardsProps = {
  resource: Resource
}

export const ResourceDetailCards: React.FC<ResourceDetailCardsProps> = ({
  resource,
}) => {
  const { resourceAllocations } = resource
  const currentDate = new Date()
  const currentAllocation = resourceAllocations.filter(
    (ra) => !ra.endDate || new Date(ra.endDate) > currentDate,
  )
  const pastAllocation = resourceAllocations.filter(
    (ra) => ra.endDate && new Date(ra.endDate) < currentDate,
  )

  const skillsList: Skills = {
    skills: [
      { skillName: 'JavaScript', value: 8 },
      { skillName: 'Angular', value: 1 },
      { skillName: 'Node', value: 5 },
      { skillName: 'React', value: 7 },
    ],
  }

  return (
    <Sections>
      <SectionContainer>
        <Section>
          <SectionTitle>Resource Information</SectionTitle>
          <ResourceDetails resource={resource} />
        </Section>

        {skillsList.skills.length > 0 && (
          <Section>
            <SectionTitle>Skill Proficiency</SectionTitle>
            <Histogram skills={skillsList.skills} />
          </Section>
        )}

        {(currentAllocation.length > 0 || pastAllocation.length > 0) && (
          <Section>
            <SectionTitle>Project Information</SectionTitle>
            <ProjectAllocation
              currentAllocations={currentAllocation}
              pastAllocations={pastAllocation}
            />
          </Section>
        )}
      </SectionContainer>
    </Sections>
  )
}
