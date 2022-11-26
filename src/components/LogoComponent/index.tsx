import styles from './styles.module.scss'

export const LogoComponent = () => {
  return (
    <div className={styles.logo}>
      <div>
        <span>Rick and</span> <br /> <span>Morty</span>
      </div>
    </div>
  )
}
