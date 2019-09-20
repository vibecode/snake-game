import React from 'react'
import { foodItem } from './calcPositions'
import { SnakeSegments } from './App'
import { ReactComponent as Apple } from './img/Apple.svg'
import styles from './App.module.scss'

export const getItem = (x: number, y: number, snakeSegments: SnakeSegments) => {
  if (foodItem.x === x && foodItem.y === y) {
    return (
      <div className={styles.food}>
        <Apple fill="red" />
      </div>
    )
  }

  for (let i = 0; i < snakeSegments.length; i++) {
    if (snakeSegments[i].x === x && snakeSegments[i].y === y) {
      if (i === 0) {
        return <div className={styles.snake_head} />
      }
      return <div className={styles.snake_body} />
    }
  }
}
