import React from 'react'
import styles from '../styles/NavBar.module.css'
import Image from 'next/image'
import { NavButton, NavButtons } from './'
import { GiHamburgerMenu } from 'react-icons/gi'

export const NavBar = () => {
  const [collapsed, setCollapsed] = React.useState(false)
  // const [mQuery, setMQuery] = React.useState<any>({
  //   matches: window.innerWidth > 768 ? true : false,
  // });
  const [displaySideMenu, setDisplaySideMenu] = React.useState(false)

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

  React.useEffect(() => {
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
      <div className={styles.main}>
        {collapsed ? (
          <div className={styles.collapsedNav}>
            <GiHamburgerMenu size="40px" onClick={handleHamburgerClick} />
          </div>
        ) : (
          <div className={styles.fullNav}>
            <Image src="/images/recon-192x192.png" height="60" width="60" />
            <NavButtons buttonProperties={buttonProperties} displayType="row" />
          </div>
        )}
      </div>
      {displaySideMenu ? (
        <div style={{ width: '50%' }}>
          <NavButtons
            buttonProperties={buttonProperties}
            displayType="column"
          />
        </div>
      ) : (
        <></>
      )}
    </>
  )
}
