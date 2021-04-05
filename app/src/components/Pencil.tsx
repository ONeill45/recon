import styled from '@emotion/styled'
import { BsPencil } from 'react-icons/bs'
import { useRouter } from 'next/router'

type pencilProps = {
  size: string
  route: string
  id?: string
}

const PencilDiv = styled.div`
  padding: 1rem;
  &:hover {
    color: orange;
    cursor: pointer;
  }
  position: absolute;
  right: 0;
  top: 1rem;
`

export const Pencil = ({ size, route, id }: pencilProps) => {
  const router = useRouter()

  const updateItem = () => {
    router.push({
      pathname: route,
      query: id ? { id } : null,
    })
  }

  return (
    <PencilDiv data-testid="PencilDiv" onClick={updateItem}>
      <BsPencil size={size} />
    </PencilDiv>
  )
}
