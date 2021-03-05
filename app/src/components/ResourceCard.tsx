import styled from '@emotion/styled'
import { useRouter } from 'next/router'

import { Resource } from 'interfaces'
import { getDurationText } from '../utils'
import {
  CardDescriptionDiv,
  CardDetailsDiv,
  CardDiv,
  CardDurationDiv,
  CardNameDiv,
  CurrentResourceAllocationDetail,
  LogoDiv,
  LogoImg,
} from './'

const ResourceCardDiv = styled(CardDiv)`
  width: 250px;
`

type ResourceCardProps = {
  resource: Resource
}

export const ResourceCard = ({ resource }: ResourceCardProps) => {
  const {
    firstName,
    lastName,
    preferredName,
    title,
    department,
    imageUrl,
    email,
    startDate,
    terminationDate,
    resourceAllocation,
  } = resource
  const router = useRouter()

  const duration = getDurationText(startDate, terminationDate)
  const currentAllocation = resourceAllocation.filter(
    (ra) => !ra.endDate || new Date(ra.endDate) > new Date(),
  )
  return (
    <ResourceCardDiv
      data-testid="ResourceCardDiv"
      onClick={() =>
        router.push({ pathname: '/resources/[id]', query: { id: resource.id } })
      }
    >
      <LogoDiv>
        <LogoImg src={imageUrl || '/images/default-avatar-500x500.png'} />
      </LogoDiv>
      <CardDetailsDiv>
        <CardNameDiv>
          {preferredName || firstName} {lastName}
        </CardNameDiv>
        <CardDescriptionDiv>{email}</CardDescriptionDiv>
        <CardDescriptionDiv>{title}</CardDescriptionDiv>
        <CardDescriptionDiv>{department.name}</CardDescriptionDiv>
        <CardDurationDiv>{duration}</CardDurationDiv>
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
      </CardDetailsDiv>
    </ResourceCardDiv>
  )
}
