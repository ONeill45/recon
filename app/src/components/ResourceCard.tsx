import { useRouter } from 'next/router'

import { Resource } from 'interfaces'
import { getRelativeTime } from '../utils'
import { CardDescriptionDiv, CardDiv, CardNameDiv } from './Card'
import { LogoDiv, LogoImg } from './Logo'
import { CurrentResourceAllocationDetail } from 'components'

type ResourceCardProps = {
  resource: Resource
}

export const ResourceCard = ({ resource }: ResourceCardProps) => {
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
    resourceAllocation,
  } = resource
  const router = useRouter()

  const duration = getRelativeTime(startDate, terminationDate)
  const currentAllocation = resourceAllocation.filter(
    (ra) => !ra.endDate || new Date(ra.endDate) > new Date(),
  )

  return (
    <CardDiv
      data-testid="ResourceCardDiv"
      clickable={true}
      onClick={() =>
        router.push({ pathname: '/resources/[id]', query: { id } })
      }
    >
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
    </CardDiv>
  )
}
