/** @jsx jsx */
import React, { useEffect, useRef, useState } from 'react'
import styled from '@emotion/styled'
import { css, jsx } from '@emotion/react'
import Image from 'next/image'
import { NavButtons } from './'
import { GiHamburgerMenu } from 'react-icons/gi'
import { AuthenticatedTemplate } from '@azure/msal-react'

import { DisplayType } from 'interfaces'
import { UserSelect } from 'components'
import { useClickOutside } from 'utils/hooks'

type displayProps = {
  displayed: boolean
  direction?: string
}

const isDisplayed = ({ displayed }: displayProps) => css`
  display: ${displayed ? 'flex' : 'none'};
`

export const MainDiv = styled.div`
  height: 60px;
  background-color: orange;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const FullNavDiv = styled.div<displayProps>`
  ${isDisplayed};
`
export const CollapsedNavDiv = styled.div<displayProps>`
  ${isDisplayed};
  height: 100%;
  padding-left: 5px;
  justify-content: flex-start;
  align-items: center;
`

export const SideNavDiv = styled.div<displayProps>`
  ${isDisplayed};
  width: 25%;
  position: fixed;
  top: 60px;
  ${(props) => (props.direction ? `${props.direction}: 0` : '')};
  background-color: orange;
  z-index: 1;
`

export const NavBar = () => {
  const [collapsed, setCollapsed] = useState(false)
  const [displaySideMenu, setDisplaySideMenu] = useState(false)

  const menuRef = useRef(null),
    buttonId = 'hamburgerButton',
    menuDiv = 'hamburgerDiv'

  useClickOutside(menuRef, () => setDisplaySideMenu(false), [buttonId, menuDiv])

  const buttonProperties = [
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

  useEffect(() => {
    const handleResize = () => {
      const collapsed = window.innerWidth < 768 ? true : false
      setCollapsed(collapsed)

      if (!collapsed) setDisplaySideMenu(false)
    }

    handleResize()

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <>
      <MainDiv>
        <CollapsedNavDiv id={menuDiv} displayed={collapsed}>
          <GiHamburgerMenu
            id={buttonId}
            size="40px"
            onClick={() => {
              setDisplaySideMenu(!displaySideMenu)
            }}
          />
        </CollapsedNavDiv>
        <FullNavDiv displayed={!collapsed}>
          <Image src="/images/recon-192x192.png" height="60" width="60" />
          <AuthenticatedTemplate>
            <NavButtons
              buttonProperties={buttonProperties}
              displayType={DisplayType.ROW}
            />
          </AuthenticatedTemplate>
        </FullNavDiv>
        <AuthenticatedTemplate>
          <UserSelect />
        </AuthenticatedTemplate>
      </MainDiv>
      <SideNavDiv displayed={displaySideMenu} ref={menuRef} direction="left">
        <NavButtons
          buttonProperties={buttonProperties}
          displayType={DisplayType.COLUMN}
        />
      </SideNavDiv>
    </>
  )
}
