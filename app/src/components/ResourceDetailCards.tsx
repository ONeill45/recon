import styled from '@emotion/styled'
import { Resource } from 'interfaces'
import { getDurationText } from 'utils'

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
}

export const ResourceDetailCards = ({ resource }: ResourceDetailCardsProps) => {
  const { department, startDate, terminationDate } = resource
  const duration = getDurationText(startDate, terminationDate)

  return (
    <CardsDiv>
      <CardDiv>
        <CardTitleDiv>Resource Information</CardTitleDiv>
        <CardDetailsDiv>
          Status: {terminationDate ? 'Terminated' : 'Active'}
        </CardDetailsDiv>
        <CardDetailsDiv>Department: {department.name}</CardDetailsDiv>
        <CardDetailsDiv>
          Hire Date: {startDate.toString().split('T')[0]}
        </CardDetailsDiv>
        <CardDetailsDiv>
          Termination Date:{' '}
          {terminationDate ? terminationDate.toString().split('T')[0] : 'N/A'}
        </CardDetailsDiv>
        <CardDetailsDiv>Length Of Service: {duration}</CardDetailsDiv>
      </CardDiv>
      <CardDiv>
        <CardTitleDiv>Project Information</CardTitleDiv>
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
