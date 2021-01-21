import styles from '../styles/NavButton.module.css'
import { NavButton } from '../components'

type navButtonProps = {
  buttonProperties: { title: string; link: string }[]
  displayType: 'column' | 'row'
}
export const NavButtons = ({
  buttonProperties,
  displayType,
}: navButtonProps) => {
  return (
    <div className={`${styles.navButtons} ${styles[displayType]}`}>
      {buttonProperties.map((buttonProperty) => {
        return (
          <NavButton
            key={buttonProperty.title}
            title={buttonProperty.title}
            route={buttonProperty.link}
          />
        )
      })}
    </div>
  )
}
