import styled from '@emotion/styled'
import { useRouter } from 'next/router'
import { DisplayType } from '../interfaces'

type navButtonProps = {
  title: string
  route: string
  displayType: DisplayType
}

type buttonProps = {
  selected: boolean
  displayType: DisplayType
}

const Button = styled.button<buttonProps>`
  cursor: pointer;
  border: none;
  padding: ${(props) =>
    props.displayType === DisplayType.COLUMN ? '12px' : '0 12px'};
  font-weight: bold;
  opacity: 100%;
  background-color: transparent;
  color: ${(props) => (props.selected ? 'white' : 'black')};
  &:hover {
    background-color: darkorange;
  }
`

export const NavButton = ({ title, route, displayType }: navButtonProps) => {
  const router = useRouter()

  const selected = router.pathname === route

  return (
    <Button
      selected={selected}
      onClick={() => router.push(route)}
      displayType={displayType}
    >
      {title}
    </Button>
  )
}
