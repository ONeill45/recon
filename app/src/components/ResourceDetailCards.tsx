import { Resource } from 'interfaces'
import { formatDate, DateFormat, getDuration } from 'utils'
import { CardDetailsDiv, CardDiv, CardNameDiv } from './Card'
import { Cards } from './Cards'
import {
  CurrentResourceAllocationDetail,
  PastResourceAllocationDetail,
} from 'components'

type ResourceDetailCardsProps = {
  resource: Resource
}

export const ResourceDetailCards = ({ resource }: ResourceDetailCardsProps) => {
  const {
    department,
    startDate,
    terminationDate,
    resourceAllocation,
  } = resource
  const duration = getDuration(startDate, terminationDate)
  const currentDate = new Date()
  const currentAllocation = resourceAllocation.filter(
    (ra) => !ra.endDate || new Date(ra.endDate) > currentDate,
  )
  const pastAllocation = resourceAllocation.filter(
    (ra) => ra.endDate && new Date(ra.endDate) < currentDate,
  )

  return (
    <Cards>
      <CardDiv>
        <CardNameDiv>Resource Information</CardNameDiv>
        <CardDetailsDiv>
          Status: {terminationDate ? 'Terminated' : 'Active'}
        </CardDetailsDiv>
        <CardDetailsDiv>Department: {department.name}</CardDetailsDiv>
        <CardDetailsDiv>
          Hire Date: {formatDate(startDate, DateFormat.DATE_ONLY)}
        </CardDetailsDiv>
        <CardDetailsDiv>
          Termination Date:{' '}
          {terminationDate
            ? formatDate(terminationDate, DateFormat.DATE_ONLY)
            : 'N/A'}
        </CardDetailsDiv>
        <CardDetailsDiv>Length Of Service: {duration}</CardDetailsDiv>
      </CardDiv>
      <CardDiv>
        <CardNameDiv>Project Information</CardNameDiv>
        <CardDetailsDiv>
          <div>Current Project(s):</div>
          {currentAllocation.length ? (
            <CurrentResourceAllocationDetail
              currentAllocation={currentAllocation}
            />
          ) : (
            <div />
          )}
        </CardDetailsDiv>
        <CardDetailsDiv>
          <div>Past Project(s):</div>
          {pastAllocation.length ? (
            <PastResourceAllocationDetail pastAllocation={pastAllocation} />
          ) : (
            <div />
          )}
        </CardDetailsDiv>
      </CardDiv>
      <CardDiv>
        <CardNameDiv>Skill Proficiency</CardNameDiv>
        <CardDetailsDiv>JavaScript: 8</CardDetailsDiv>
        <CardDetailsDiv>React: 7</CardDetailsDiv>
        <CardDetailsDiv>Vue: 5</CardDetailsDiv>
        <CardDetailsDiv>Angular: 1</CardDetailsDiv>
        <CardDetailsDiv>Node: 8</CardDetailsDiv>
      </CardDiv>
    </Cards>
  )
}
