import styled from '@emotion/styled'
import { formatDistance, isFuture, isPast } from 'date-fns'
import { Client } from 'src/interfaces'

const CardDiv = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  box-shadow: 0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 14%),
    0 1px 5px 0 rgb(0 0 0 / 12%);
  height: auto;
  width: 200px;
  padding: 16px;
  margin: 16px;
`

const CardDetailsDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding: 12px;
  align-items: center;
  justify-content: center;
  text-align: center;
`
const CardNameDiv = styled.div`
  font-size: 16px;
  font-weight: bold;
  padding: 4px;
`

const CardDescriptionDiv = styled.div`
  font-size: 12px;
  padding: 4px;
`

const CardDurationDiv = styled.div`
  font-size: 12px;
  padding: 4px;
  color: grey;
`

const LogoDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  width: 70px;
  height: 70px;
  box-shadow: 0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 14%),
    0 1px 5px 0 rgb(0 0 0 / 12%);
  overflow: hidden;
`
const LogoImg = styled.img`
  height: auto;
  width: 60px;
`

type ClientCardProps = {
  client: Client
}

const getDurationText = (startDate: Date, endDate: Date) => {
  const now = new Date()
  const start = new Date(startDate)
  const end = endDate ? new Date(endDate) : null
  if (end && isPast(end))
    return `Ended ${formatDistance(end, now, {
      addSuffix: true,
    })}`

  if (end)
    return `Ending ${formatDistance(end, now, {
      addSuffix: true,
    })}`

  if (isFuture(start))
    return `Starting ${formatDistance(start, now, {
      addSuffix: true,
    })}`

  return `Started ${formatDistance(start, now, {
    addSuffix: true,
  })}`
}
export const ClientCard = ({ client }: ClientCardProps) => {
  const { clientName, description, logoUrl, startDate, endDate } = client

  const duration = getDurationText(startDate, endDate)
  return (
    <CardDiv>
      <LogoDiv>
        <LogoImg src={logoUrl} />
      </LogoDiv>
      <CardDetailsDiv>
        <CardNameDiv>{clientName}</CardNameDiv>
        <CardDescriptionDiv>{description}</CardDescriptionDiv>
        <CardDurationDiv>{duration}</CardDurationDiv>
      </CardDetailsDiv>
    </CardDiv>
  )
}
