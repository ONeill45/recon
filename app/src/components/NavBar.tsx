import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import Image from 'next/image'
import { NavButtons } from './'
import { GiHamburgerMenu } from 'react-icons/gi'
import { DisplayType } from '../interfaces'

const MainDiv = styled.div`
  height: 60px;
  background-color: orange;
`
const FullNavDiv = styled.div`
  display: flex;
`
const CollapsedNavDiv = styled.div`
  height: 100%;
  padding-left: 5px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`

const SideNavDiv = styled.div`
  width: 25%;
  position: fixed;
  top: 60px;
  left: 0;
  background-color: orange;
`

export const NavBar = () => {
  const [collapsed, setCollapsed] = useState(false)
  const [displaySideMenu, setDisplaySideMenu] = useState(false)

  const buttonProperties = [
    {
      title: 'Home',
      link: '/',
    },
    {
      title: 'Clients',
      link: '/clients',
    },
    {
      title: 'Projects',
      link: '/projects',
    },
    {
      title: 'Resources',
      link: '/resources',
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

  const handleHamburgerClick = () => {
    setDisplaySideMenu(!displaySideMenu)
  }

  return (
    <>
      <MainDiv>
        {collapsed ? (
          <CollapsedNavDiv>
            <GiHamburgerMenu size="40px" onClick={handleHamburgerClick} />
          </CollapsedNavDiv>
        ) : (
          <FullNavDiv>
            <Image src="/images/recon-192x192.png" height="60" width="60" />
            <NavButtons
              buttonProperties={buttonProperties}
              displayType={DisplayType.ROW}
            />
          </FullNavDiv>
        )}
      </MainDiv>
      {displaySideMenu ? (
        <SideNavDiv>
          <NavButtons
            buttonProperties={buttonProperties}
            displayType={DisplayType.COLUMN}
          />
        </SideNavDiv>
      ) : (
        <></>
      )}
    </>
  )
}
