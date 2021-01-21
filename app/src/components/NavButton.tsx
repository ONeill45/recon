import { useRouter } from 'next/router'
import styles from '../styles/NavButton.module.css'

type navButtonProps = {
  title: string
  route: string
}

export const NavButton = ({ title, route }: navButtonProps) => {
  const router = useRouter()
  return (
    <button className={styles.navButton} onClick={() => router.push(route)}>
      {title}
    </button>
  )
}
