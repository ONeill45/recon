import styled from '@emotion/styled'
import { BsPlusCircle } from 'react-icons/bs'
import { useRouter } from 'next/router'

type plusCircleProps = {
  size: string
  route: string
}

const PlusCircleDiv = styled.div`
  float: left;
  padding: 15px 15px;
  &:hover {
    color: orange;
    cursor: pointer;
  }
`

export const PlusCircle = ({ size, route }: plusCircleProps) => {
  const router = useRouter()
  return (
    <PlusCircleDiv
      data-testid="PlusCircleDiv"
      onClick={() => router.push(route)}
    >
      <BsPlusCircle size={size} />
    </PlusCircleDiv>
  )
}
