import React, { useState, useEffect, useCallback } from 'react'
import { DIRECTION, FIELD_ROW, ARROW, Position } from './types'
import { useInterval } from './utils'
import { newSnakePosition } from './calcPositions'
import { getItem } from './getItem'
import YouDied from './YouDied'
import './App.css'

export interface SnakeSegments extends Array<Position> {}

const App: React.FC = () => {
  const [direction, setDirection] = useState<Position>(DIRECTION.LEFT)

  //TODO: extract default state
  const [snakeSegments, setSnakeSegments] = useState<SnakeSegments>([
    { x: 8, y: 8 },
    { x: 8, y: 7 },
    { x: 8, y: 6 }
  ])

  const handleKeyPress = useCallback((ev: KeyboardEvent) => {
    const code = ev.code

    if (code === ARROW.UP) {
      setDirection(DIRECTION.TOP)
    }
    if (code === ARROW.DOWN) {
      setDirection(DIRECTION.BOTTOM)
    }
    if (code === ARROW.LEFT) {
      setDirection(DIRECTION.LEFT)
    }
    if (code === ARROW.RIGHT) {
      setDirection(DIRECTION.RIGHT)
    }
  }, [])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress)

    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [handleKeyPress])

  const [head, ...tail] = snakeSegments
  const intersectsWithItself = tail.some(
    segment => segment.x === head.x && segment.y === head.y
  )

  useInterval(
    () => {
      setSnakeSegments(segments => newSnakePosition(segments, direction))
    },
    intersectsWithItself ? null : 100
  )

  return (
    <div className="game-container">
      <h1>Snake game</h1>

      {intersectsWithItself ? (
        <YouDied />
      ) : (
        <div>
          {FIELD_ROW.map(y => (
            <div className="grid_row" key={y}>
              {FIELD_ROW.map(x => (
                <div key={x}>
                  {getItem(x, y, snakeSegments) || (
                    <div className="grid_pixel"> . </div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default App
