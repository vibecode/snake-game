import React from 'react'
import { foodItem } from './calcPositions'
import { SnakeSegments } from './App'

export const getItem = (x: number, y: number, snakeSegments: SnakeSegments) => {
  if (foodItem.x === x && foodItem.y === y) {
    return <div className="food"></div>
  }

  for (let i = 0; i < snakeSegments.length; i++) {
    if (snakeSegments[i].x === x && snakeSegments[i].y === y) {
      if (i === 0) {
        return <div className="snake_head">■</div>
      }
      return <div className="snake_body">■</div>
    }
  }
}
