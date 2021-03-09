import { Project, Resource } from 'interfaces'
import React from 'react'
import { formatDate, DateFormat, getDuration } from 'utils'
import { CardDetailsDiv, CardDiv, CardNameDiv } from './Card'
import { Cards } from './Cards'
import { ResourceCard } from './ResourceCard'

type ProjectDetailCardsProps = {
  project: Project
  resources: Resource[]
}

export const ProjectDetailCards = ({
  project,
  resources,
}: ProjectDetailCardsProps) => {
  const { startDate, endDate } = project
  const duration = getDuration(startDate, endDate)

  return (
    <Cards>
      <CardDiv>
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
      </CardDiv>
      <CardDiv>
        <CardNameDiv>Skills Required</CardNameDiv>
        <CardDetailsDiv>JavaScript: 8</CardDetailsDiv>
        <CardDetailsDiv>React: 7</CardDetailsDiv>
        <CardDetailsDiv>Vue: 5</CardDetailsDiv>
        <CardDetailsDiv>Angular: 1</CardDetailsDiv>
        <CardDetailsDiv>Node: 8</CardDetailsDiv>
      </CardDiv>
      <CardDiv>
        <CardNameDiv>Skills Allocated</CardNameDiv>
        <CardDetailsDiv>JavaScript: 8</CardDetailsDiv>
        <CardDetailsDiv>React: 7</CardDetailsDiv>
        <CardDetailsDiv>Vue: 5</CardDetailsDiv>
        <CardDetailsDiv>Angular: 1</CardDetailsDiv>
        <CardDetailsDiv>Node: 8</CardDetailsDiv>
      </CardDiv>
      {resources.map((resource: Resource) => {
        return <ResourceCard resource={resource} key={resource.id} />
      })}
    </Cards>
  )
}
