/** @jsx jsx */
import React, { useEffect, useRef, useState } from 'react'
import styled from '@emotion/styled'
import { css, jsx } from '@emotion/react'
import Image from 'next/image'
import { NavButtons } from './'
import { GiHamburgerMenu } from 'react-icons/gi'
import { AuthenticatedTemplate } from '@azure/msal-react'

import { DisplayType } from '../interfaces'
import UserSelect from './UserSelect'
import { useClickOutside } from '../utils/hooks'

type displayProps = {
  displayed: boolean
  direction?: string
}

const isDisplayed = ({ displayed }: displayProps) => css`
  display: ${displayed ? 'flex' : 'none'};
`

const MainDiv = styled.div`
  height: 60px;
  background-color: orange;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const FullNavDiv = styled.div<displayProps>`
  ${isDisplayed};
`
const CollapsedNavDiv = styled.div<displayProps>`
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
`

export const NavBar = () => {
  const [collapsed, setCollapsed] = useState(false)
  const [displaySideMenu, setDisplaySideMenu] = useState(false)

  const menuRef = useRef(null)
  const buttonId = 'hamburgerButton'
  useClickOutside(menuRef, () => setDisplaySideMenu(false), [buttonId])

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
    setCollapsed(window.innerWidth < 768 ? true : false)
    const mediaQuery = window.matchMedia('(max-width: 768px)')
    mediaQuery.addEventListener('change', (e) => {
      const collapsed = e.matches
      setCollapsed(collapsed)

      if (!collapsed) setDisplaySideMenu(false)
    })

    return () =>
      mediaQuery.removeEventListener('change', (e) => setCollapsed(e.matches))
  }, [])

  return (
    <>
      <MainDiv>
        <CollapsedNavDiv displayed={collapsed}>
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
          <NavButtons
            buttonProperties={buttonProperties}
            displayType={DisplayType.ROW}
          />
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
