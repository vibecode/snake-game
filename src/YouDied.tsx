import React from 'react'
import styles from './YouDied.module.scss'

interface Props {
  cb: () => void
  highScore: number
}

const YouDied: React.FC<Props> = ({ cb, highScore }) => (
  <>
    <h1 className={styles.died}>You died</h1>
    <p className={styles.highScore}>High Score: {highScore}</p>
    <button className={styles.died_button} onClick={cb}>
      Try not to eat yourself again
    </button>
  </>
)

export default YouDied
