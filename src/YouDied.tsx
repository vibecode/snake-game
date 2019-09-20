import React from 'react'
import styles from './YouDied.module.scss'

interface Props {
  cb: () => void
}

const YouDied: React.FC<Props> = ({ cb }) => (
  <>
    <h1 className={styles.died}>You died</h1>
    <button className={styles.died_button} onClick={cb}>
      Try again
    </button>
  </>
)

export default YouDied
