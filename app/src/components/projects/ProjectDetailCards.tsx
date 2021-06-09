import { Project, ResourceAllocation } from 'interfaces'
import React from 'react'
import { formatDate, DateFormat, getDuration } from 'utils'
import { Card, CardDetailsDiv, CardNameDiv } from 'components/common/Card'
import { CardsContainer } from 'components/layouts/CardsContainer'

type ProjectDetailCardsProps = {
  project: Project
}

export const ProjectDetailCards: React.FC<ProjectDetailCardsProps> = ({
  project,
}) => {
  const { startDate, endDate, resourceAllocations } = project
  const duration = getDuration(startDate, endDate)

  return (
    <CardsContainer>
      <Card>
        <CardNameDiv>Project Information</CardNameDiv>
        <CardDetailsDiv>
          Status: {endDate ? 'Terminated' : 'Active'}
        </CardDetailsDiv>
        <CardDetailsDiv>
          Start Date: {formatDate(startDate, DateFormat.DATE_ONLY)}
        </CardDetailsDiv>
        <CardDetailsDiv>
          End Date:{' '}
          {endDate ? formatDate(endDate, DateFormat.DATE_ONLY) : 'N/A'}
        </CardDetailsDiv>
        <CardDetailsDiv>Length Of Project: {duration}</CardDetailsDiv>
      </Card>
      <Card>
        <CardNameDiv>Skills Required</CardNameDiv>
        <CardDetailsDiv>JavaScript: 8</CardDetailsDiv>
        <CardDetailsDiv>React: 7</CardDetailsDiv>
        <CardDetailsDiv>Vue: 5</CardDetailsDiv>
        <CardDetailsDiv>Angular: 1</CardDetailsDiv>
        <CardDetailsDiv>Node: 8</CardDetailsDiv>
      </Card>
      <Card>
        <CardNameDiv>Skills Allocated</CardNameDiv>
        <CardDetailsDiv>JavaScript: 8</CardDetailsDiv>
        <CardDetailsDiv>React: 7</CardDetailsDiv>
        <CardDetailsDiv>Vue: 5</CardDetailsDiv>
        <CardDetailsDiv>Angular: 1</CardDetailsDiv>
        <CardDetailsDiv>Node: 8</CardDetailsDiv>
      </Card>
      <Card>
        <CardNameDiv>Resources Allocated</CardNameDiv>
        {resourceAllocations?.map((ra: ResourceAllocation) => (
          <CardDetailsDiv key={ra.id}>
            {ra.resource.preferredName || ra.resource.firstName}{' '}
            {ra.resource.lastName}
          </CardDetailsDiv>
        ))}
      </Card>
    </CardsContainer>
  )
}
