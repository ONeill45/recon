import { Resource } from 'interfaces'
import { getRelativeTime, formatDate, DateFormat, getDuration } from 'utils'
import { CardDetailsDiv, CardDiv, CardNameDiv } from './Card'
import { Cards } from './Cards'

type ResourceDetailCardsProps = {
  resource: Resource
}

export const ResourceDetailCards = ({ resource }: ResourceDetailCardsProps) => {
  const { department, startDate, terminationDate } = resource
  const duration = getDuration(startDate, terminationDate)

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
          Current Project(s):{' '}
          <ul>
            <li>Recon</li>
          </ul>
        </CardDetailsDiv>
        <CardDetailsDiv>
          Past Project(s):{' '}
          <ul>
            <li>Duzy Admin</li>
            <li>Work OS</li>
          </ul>
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
