import React from 'react'
import { ReactComponent as ArrowUp } from './img/ArrowUp.svg'
import { ReactComponent as ArrowDown } from './img/ArrowDown.svg'
import { ReactComponent as ArrowLeft } from './img/ArrowLeft.svg'
import { ReactComponent as ArrowRight } from './img/ArrowRight.svg'
import styles from './Keyboard.module.scss'

interface Props {
  upCb: () => void
  downCb: () => void
  leftCb: () => void
  rightCb: () => void
}

const Keyboard: React.FC<Props> = ({ upCb, downCb, leftCb, rightCb }) => {
  return (
    <div className={styles.keyboard_box}>
      <div className={styles.arrow} onTouchStart={upCb}>
        <ArrowUp />
      </div>
      <div className={styles.row}>
        <div className={styles.arrow} onTouchStart={leftCb}>
          <ArrowLeft />
        </div>
        <div className={styles.arrow} onTouchStart={downCb}>
          <ArrowDown />
        </div>
        <div className={styles.arrow} onTouchStart={rightCb}>
          <ArrowRight />
        </div>
      </div>
    </div>
  )
}

export default Keyboard
