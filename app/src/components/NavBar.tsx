import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { css } from '@emotion/react'
import Image from 'next/image'
import { NavButtons } from './'
import { GiHamburgerMenu } from 'react-icons/gi'
import { DisplayType } from '../interfaces'

type displayProps = {
  displayed: boolean
}

const isDisplayed = ({ displayed }: displayProps) => css`
  display: ${displayed ? 'flex' : 'none'};
`

export const MainDiv = styled.div`
  height: 60px;
  background-color: orange;
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
  left: 0;
  background-color: orange;
  z-index: 1;
`

export const NavBar = () => {
  const [collapsed, setCollapsed] = useState(false)
  const [displaySideMenu, setDisplaySideMenu] = useState(false)

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
        <CollapsedNavDiv displayed={collapsed}>
          <GiHamburgerMenu
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
      </MainDiv>
      <SideNavDiv displayed={displaySideMenu}>
        <NavButtons
          buttonProperties={buttonProperties}
          displayType={DisplayType.COLUMN}
        />
      </SideNavDiv>
    </>
  )
}
