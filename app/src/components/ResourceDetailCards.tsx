import styled from '@emotion/styled'
import { Resource, ResourceAllocation } from 'interfaces'
import { formatDate, getDurationText } from 'utils'
import {
  CurrentResourceAllocationDetail,
  PastResourceAllocationDetail,
} from 'components'

const CardsDiv = styled.div`
  display: flex;
`

const CardDiv = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  box-shadow: 0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 14%),
    0 1px 5px 0 rgb(0 0 0 / 12%);
  height: auto;
  width: 300px;
  padding: 16px;
  margin: 16px;
`

const CardTitleDiv = styled.div`
  text-align: center;
`

const CardDetailsDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding: 12px;
  font-size: 12px;
`

type ResourceDetailCardsProps = {
  resource: Resource
  resourceAllocation: ResourceAllocation[]
}

export const ResourceDetailCards = ({
  resource,
  resourceAllocation,
}: ResourceDetailCardsProps) => {
  const { department, startDate, terminationDate } = resource
  const duration = getDurationText(startDate, terminationDate)
  const currentDate = new Date()
  const currentAllocation = resourceAllocation.filter(
    (ra) => !ra.endDate || new Date(ra.endDate) > currentDate,
  )
  const pastAllocation = resourceAllocation.filter(
    (ra) => ra.endDate && new Date(ra.endDate) < currentDate,
  )

  return (
    <CardsDiv>
      <CardDiv>
        <CardTitleDiv>Resource Information</CardTitleDiv>
        <CardDetailsDiv>
          Status: {terminationDate ? 'Terminated' : 'Active'}
        </CardDetailsDiv>
        <CardDetailsDiv>Department: {department.name}</CardDetailsDiv>
        <CardDetailsDiv>Hire Date: {formatDate(startDate)}</CardDetailsDiv>
        <CardDetailsDiv>
          Termination Date:{' '}
          {terminationDate ? formatDate(terminationDate) : 'N/A'}
        </CardDetailsDiv>
        <CardDetailsDiv>Length Of Service: {duration}</CardDetailsDiv>
      </CardDiv>
      <CardDiv>
        <CardTitleDiv>Project Information</CardTitleDiv>
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
        <CardTitleDiv>Skill Proficiency</CardTitleDiv>
        <CardDetailsDiv>JavaScript: 8</CardDetailsDiv>
        <CardDetailsDiv>React: 7</CardDetailsDiv>
        <CardDetailsDiv>Vue: 5</CardDetailsDiv>
        <CardDetailsDiv>Angular: 1</CardDetailsDiv>
        <CardDetailsDiv>Node: 8</CardDetailsDiv>
      </CardDiv>
    </CardsDiv>
  )
}
