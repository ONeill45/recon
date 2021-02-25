import { gql, useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import styled from '@emotion/styled'

import { getDurationText } from 'utils'

const NameDiv = styled.div`
  font-size: 16px;
  font-weight: bold;
  padding: 4px;
`

const DescriptionDiv = styled.div`
  font-size: 12px;
  padding: 4px;
`

const HeaderDiv = styled.div`
  display: flex;
  border-bottom: 1px solid black;
  padding: 10px;
`
const SubHeaderDiv = styled.div`
  padding: 10px 10px;
`

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

const LogoDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  width: 100px;
  height: 100px;
  box-shadow: 0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 14%),
    0 1px 5px 0 rgb(0 0 0 / 12%);
  overflow: hidden;
`

const LogoImg = styled.img`
  height: auto;
  width: 80px;
`

const GET_RESOURCE = gql`
  query GetResource($id: String!) {
    resource(id: $id) {
      id
      firstName
      lastName
      preferredName
      title
      startDate
      terminationDate
      imageUrl
      department {
        name
      }
      email
    }
  }
`

const Resource = () => {
  const router = useRouter()
  const { data, loading, error } = useQuery(GET_RESOURCE, {
    variables: {
      id: router.query.id,
    },
  })

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  const {
    resource: {
      firstName,
      lastName,
      preferredName,
      title,
      imageUrl,
      email,
      department,
      startDate,
      terminationDate,
    },
  } = data

  const duration = getDurationText(startDate, terminationDate)

  return (
    <>
      <HeaderDiv>
        <LogoDiv>
          <LogoImg
            src={imageUrl ? imageUrl : '/images/default-avatar-500x500.png'}
          />
        </LogoDiv>
        <SubHeaderDiv>
          <NameDiv>
            {preferredName ? preferredName : firstName} {lastName}
          </NameDiv>
          <DescriptionDiv>{email}</DescriptionDiv>
          <DescriptionDiv>{title}</DescriptionDiv>
        </SubHeaderDiv>
      </HeaderDiv>
      <CardsDiv>
        <CardDiv>
          <CardTitleDiv>Resource Information</CardTitleDiv>
          <CardDetailsDiv>
            Status: {terminationDate ? 'Terminated' : 'Active'}
          </CardDetailsDiv>
          <CardDetailsDiv>Department: {department.name}</CardDetailsDiv>
          <CardDetailsDiv>Hire Date: {startDate.split('T')[0]}</CardDetailsDiv>
          <CardDetailsDiv>
            Termination Date:{' '}
            {terminationDate ? terminationDate.split('T')[0] : 'N/A'}
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
    </>
  )
}

export default Resource
