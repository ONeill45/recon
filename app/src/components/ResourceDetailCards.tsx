import { Resource } from 'interfaces'
import { Sections } from './Sections'
import { Histogram, Skills } from './Histogram'
import { ProjectAllocation } from './ProjectAllocation'
import { ResourceAllocation } from './ResourceAllocation'
import { SectionContainer, Section, SectionTitle } from './Section'

type ResourceDetailCardsProps = {
  resource: Resource
}

export const ResourceDetailCards = ({ resource }: ResourceDetailCardsProps) => {
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
          <ResourceAllocation resource={resource} />
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
              currentAllocation={currentAllocation}
              pastAllocation={pastAllocation}
            />
          </Section>
        )}
      </SectionContainer>
    </Sections>
  )
}
