import React, { useEffect } from 'react'
import styled from '@emotion/styled'
import { css } from '@emotion/react'
import { Button } from './'
import { GiHamburgerMenu } from 'react-icons/gi'
import { AuthenticatedTemplate } from '@azure/msal-react'
import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Portal,
  Stack,
  useBreakpointValue,
  useDisclosure,
} from '@chakra-ui/react'
import { FaBinoculars } from 'react-icons/fa'

import { DisplayType } from 'interfaces'
import { UserSelect, NavLinks } from 'components'
import { useRouter } from 'next/router'

type displayProps = {
  displayed: boolean
  direction?: string
}

const isDisplayed = ({ displayed }: displayProps) => css`
  display: ${displayed ? 'flex' : 'none'};
`

export const MainDiv = styled.div`
  padding: 0px 20px;
  background-color: var(--chakra-colors-primary-500);
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const SideNavDiv = styled.div<displayProps>`
  ${isDisplayed};
  width: 25%;
  position: fixed;
  top: 60px;
  ${(props) =>
    props.direction ? `${props.direction}: 0` /* istanbul ignore next */ : ''};
  background-color: orange;
  z-index: 1;
`

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  font-family: 'MuseoModerno', Arial, sans-serif;
  font-weight: bold;
  color: #ffffff;
  font-size: 36px;
  > * {
    margin-right: 12px;
    &:last-child {
      margin-right: 0px;
    }
  }
  svg {
    line-height: 1em;
    font-size: 32px;
  }
`

export const NavBar = () => {
  const hamburgerRef = React.useRef(null)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = () => {
      if (isOpen) {
        onClose()
      }
    }

    if (router?.events) {
      router.events.off('routeChangeStart', handleRouteChange)
      router.events.on('routeChangeStart', handleRouteChange)
    }
    return () => {
      if (router?.events) {
        router.events.off('routeChangeStart', handleRouteChange)
      }
    }
  }, [router, isOpen, onClose])

  const showHamburger = useBreakpointValue({ base: true, md: false })

  const navLinks = [
    {
      title: 'Home',
      route: '/',
    },
    {
      title: 'Clients',
      route: '/clients',
    },
    {
      title: 'Projects',
      route: '/projects',
    },
    {
      title: 'Resources',
      route: '/resources',
    },
  ]

  return (
    <>
      <MainDiv>
        {showHamburger ? (
          <Button
            ref={hamburgerRef}
            onClick={onOpen}
            variant="link"
            color="white"
            data-testid="CollapsedNav"
          >
            <GiHamburgerMenu data-testid="HamburgerMenu" size="40px" />
          </Button>
        ) : (
          <Stack direction="row" spacing="10" data-testid="FullNav">
            <LogoContainer>
              <span>RECON</span>
              <FaBinoculars />
            </LogoContainer>
            <AuthenticatedTemplate>
              <Box alignSelf="flex-end">
                <NavLinks routes={navLinks} displayType={DisplayType.ROW} />
              </Box>
            </AuthenticatedTemplate>
          </Stack>
        )}
        <AuthenticatedTemplate>
          <UserSelect />
        </AuthenticatedTemplate>
      </MainDiv>
      <Portal>
        <Drawer
          isOpen={isOpen}
          placement="left"
          onClose={onClose}
          finalFocusRef={hamburgerRef}
        >
          <DrawerOverlay data-testid="SideNavOverlay" />
          <DrawerContent data-testid="SideNav">
            <DrawerCloseButton />
            <DrawerHeader>
              <LogoContainer>
                <span>RECON</span>
                <FaBinoculars />
              </LogoContainer>
            </DrawerHeader>

            <DrawerBody>
              <NavLinks routes={navLinks} displayType={DisplayType.COLUMN} />
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Portal>
    </>
  )
}
