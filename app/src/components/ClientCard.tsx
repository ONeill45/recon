import styled from '@emotion/styled'

const CardDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 14%),
    0 1px 5px 0 rgb(0 0 0 / 12%);
  height: 150px;
  width: 100px;
`

const ClientNameDiv = styled.div`
  font-size: 16px;
  font-weight: bold;
` // const ImageDiv = styled.img

//   display: flex;
//   justify-content: center;
//   align-items: center;
//   box-shadow: 0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 14%),
//     0 1px 5px 0 rgb(0 0 0 / 12%);
//   height: 150px;
//   width: 100px;
// `

type Client = {
  id: string
  clientName: string
  description: string
  logoUrl: string
  startDate: Date
  endDate: Date
}

type ClientCardProps = {
  client: Client
}

export const ClientCard = ({ client }: ClientCardProps) => {
  const { clientName, logoUrl } = client
  return (
    <CardDiv>
      <img src={logoUrl} height="60" width="60" />
      <ClientNameDiv>{clientName}</ClientNameDiv>
    </CardDiv>
  )
}
