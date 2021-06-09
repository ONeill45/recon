import React from 'react'

import { Resource } from 'interfaces'
import { getRelativeTime } from 'utils'
import { Card, CardDescriptionDiv, CardNameDiv } from 'components/common/Card'
import { LogoDiv, LogoImg } from 'components/Logo'
import { CurrentResourceAllocationDetail } from 'components/allocations/CurrentResourceAllocationDetail'

type ResourceCardProps = {
  resource: Resource
}

export const ResourceCard: React.FC<ResourceCardProps> = ({ resource }) => {
  const {
    id,
    firstName,
    lastName,
    preferredName,
    title,
    department: { name: departmentName },
    imageUrl,
    email,
    startDate,
    terminationDate,
    resourceAllocations,
  } = resource

  const duration = getRelativeTime(startDate, terminationDate)
  const currentAllocation = resourceAllocations.filter(
    (ra) => !ra.endDate || new Date(ra.endDate) > new Date(),
  )

  return (
    <Card link={`/resources/${id}`}>
      <LogoDiv>
        <LogoImg src={imageUrl || '/images/default-avatar-500x500.png'} />
      </LogoDiv>
      <CardNameDiv>
        {preferredName || firstName} {lastName}
      </CardNameDiv>
      <CardDescriptionDiv>{email}</CardDescriptionDiv>
      <CardDescriptionDiv>{title}</CardDescriptionDiv>
      <CardDescriptionDiv>{departmentName}</CardDescriptionDiv>
      <CardDescriptionDiv color="grey">{duration}</CardDescriptionDiv>
      <CardDescriptionDiv>
        <div>Current Project(s):</div>
        {currentAllocation.length ? (
          <CurrentResourceAllocationDetail
            currentAllocation={currentAllocation}
          />
        ) : (
          <div />
        )}
      </CardDescriptionDiv>
    </Card>
  )
}
