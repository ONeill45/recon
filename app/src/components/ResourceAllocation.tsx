import styled from '@emotion/styled'
import { formatDate, DateFormat, getDuration } from 'utils'
import { Resource, ResourceStatus } from 'interfaces'
import {
  SectionTable,
  SectionTableHeaderRow,
  SectionTableHeaderData,
  SectionTableData,
} from './Section'

const ResourceAllocationContainer = styled.div``

type ResourceDetailsProps = {
  resource: Resource
}

export const ResourceAllocation = ({ resource }: ResourceDetailsProps) => {
  const { department, startDate, terminationDate } = resource
  const duration = getDuration(startDate, terminationDate)

  return (
    <ResourceAllocationContainer>
      <SectionTable>
        <thead>
          <SectionTableHeaderRow>
            <SectionTableHeaderData>Status</SectionTableHeaderData>
            <SectionTableHeaderData>Department</SectionTableHeaderData>
            <SectionTableHeaderData>Hire Date</SectionTableHeaderData>
            <SectionTableHeaderData>Termination Date</SectionTableHeaderData>
            <SectionTableHeaderData>Length of Service</SectionTableHeaderData>
          </SectionTableHeaderRow>
        </thead>
        <tbody>
          <tr>
            <SectionTableData>
              {terminationDate ? ResourceStatus.TERMINATED : ResourceStatus.ACTIVE}
            </SectionTableData>
            <SectionTableData>{department.name}</SectionTableData>
            <SectionTableData>
              {formatDate(startDate, DateFormat.DATE_ONLY)}
            </SectionTableData>
            <SectionTableData>
              {terminationDate
                ? formatDate(terminationDate, DateFormat.DATE_ONLY)
                : 'N/A'}
            </SectionTableData>
            <SectionTableData>{duration}</SectionTableData>
          </tr>
        </tbody>
      </SectionTable>
    </ResourceAllocationContainer>
  )
}
