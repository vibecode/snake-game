import { FIELD_SIZE } from './types'
import { Position } from './types'
import { SnakeSegments } from './App'

const limitByField = (x: number) => {
  if (x >= FIELD_SIZE) {
    return 0
  }
  if (x < 0) {
    return FIELD_SIZE - 1
  }

  return x
}

const getFoodItem = () => ({
  x: Math.floor(Math.random() * FIELD_SIZE),
  y: Math.floor(Math.random() * FIELD_SIZE)
})

export let foodItem = getFoodItem()

const collidesWithFood = (head: Position, foodItem: Position) => {
  return foodItem.x === head.x && foodItem.y === head.y
}

export const newSnakePosition = (
  segments: SnakeSegments,
  direction: Position
) => {
  const [head] = segments
  const newHead = {
    x: limitByField(head.x + direction.x),
    y: limitByField(head.y + direction.y)
  }
  if (collidesWithFood(newHead, foodItem)) {
    foodItem = getFoodItem()

    return [newHead, ...segments]
  } else {
    return [newHead, ...segments.slice(0, -1)]
  }
}
