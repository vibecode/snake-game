import React from 'react'
import { foodItem } from './calcPositions'
import { SnakeSegments } from './App'
import { ReactComponent as Apple } from './Apple.svg'

export const getItem = (x: number, y: number, snakeSegments: SnakeSegments) => {
  if (foodItem.x === x && foodItem.y === y) {
    return (
      <div className="food">
        <Apple fill="red" />
      </div>
    )
  }

  for (let i = 0; i < snakeSegments.length; i++) {
    if (snakeSegments[i].x === x && snakeSegments[i].y === y) {
      if (i === 0) {
        return <div className="snake_head" />
      }
      return <div className="snake_body" />
    }
  }
}
