import { useRouter } from 'next/router'
import styles from '../styles/NavButton.module.css'

type navButtonProps = {
  title: string
  route: string
}

export const NavButton = ({ title, route }: navButtonProps) => {
  const router = useRouter()

  const selected = router.pathname === route ? styles.selected : ''

  return (
    <button
      className={`${styles.navButton} ${selected}`}
      onClick={() => router.push(route)}
    >
      {title}
    </button>
  )
}
