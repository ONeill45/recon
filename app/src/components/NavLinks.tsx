import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Link as ChakraLink, Stack, useColorMode } from '@chakra-ui/react'
import styled from '@emotion/styled'

import { DisplayType } from 'interfaces'

type NavLinksProps = {
  routes: { title: string; route: string }[]
  displayType: DisplayType
}

const NavLink = styled(ChakraLink, {
  shouldForwardProp: (propName) =>
    propName !== 'active' && propName !== 'hoverColor',
})<{
  active?: boolean
  hoverColor?: string
}>(
  ({ color, hoverColor, active }) => `
  transition: transform 250ms ease-in-out;
  position: relative;
  padding: 10px;

  margin-right: 8px;

  ${active ? 'font-weight: bold;' : ''}

  &:last-child {
    margin-right: 8px;
  }

  &:hover {
    color: var(--chakra-colors-${hoverColor});
    text-decoration: none;
  }

  &:after {
    display: block;
    position: absolute;
    bottom: 0px;
    left: 0px;
    width: 100%;
    content: '';
    border-bottom: solid 3px var(--chakra-colors-${
      active ? color : hoverColor
    });
    transform: ${active ? '' : 'scaleX(0)'};
    transition: transform 250ms ease-in-out;
  }
  &:hover:after {
    transform: scaleX(1);
  }
`,
)

export const NavLinks: React.FC<NavLinksProps> = ({ routes, displayType }) => {
  const router = useRouter()
  const { colorMode } = useColorMode()

  const textColor =
    displayType === DisplayType.COLUMN && colorMode === 'light'
      ? 'black'
      : 'white'

  const hoverColor =
    displayType === DisplayType.COLUMN && colorMode === 'light'
      ? 'gray-800'
      : 'gray-300'

  return (
    <Stack direction={displayType}>
      {routes.map((route) => (
        <Link href={route.route} key={route.title} passHref>
          <NavLink
            active={router.pathname === route.route}
            color={textColor}
            hoverColor={hoverColor}
          >
            {route.title}
          </NavLink>
        </Link>
      ))}
    </Stack>
  )
}
