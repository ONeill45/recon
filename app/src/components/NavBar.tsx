import styles from '../styles/NavBar.module.css'
import Image from 'next/image'
import { NavButton } from './NavButton'
import { GiHamburgerMenu } from 'react-icons/gi'

type topNavBarProps = {
  collapsed: boolean
}

export const NavBar = ({ collapsed }: topNavBarProps) => {
  return (
    <div className={styles.main}>
      {collapsed ? (
        <div className={styles.collapsedNav}>
          <GiHamburgerMenu size="40px" />
        </div>
      ) : (
        <div className={styles.fullNav}>
          <Image src="/images/recon-192x192.png" height="60" width="60" />
          <div className={styles.navButtons}>
            <NavButton title="Home" route="/" />
            <NavButton title="Clients" route="/clients" />
            <NavButton title="Projects" route="/projects" />
            <NavButton title="Resources" route="/resources" />
          </div>
        </div>
      )}
    </div>
  )
}
