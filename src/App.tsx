import React, { useState, useEffect, useCallback } from 'react'
import { DIRECTION, FIELD_ROW, ARROW, Position } from './types'
import { useInterval } from './useInterval'
import { newSnakePosition } from './calcPositions'
import { getItem } from './getItem'
import YouDied from './YouDied'
import styles from './App.module.scss'
import { ReactComponent as Keys } from './Keys.svg'

export interface SnakeSegments extends Array<Position> {}

const initialSnake = [{ x: 8, y: 8 }, { x: 8, y: 7 }, { x: 8, y: 6 }]

const App: React.FC = () => {
  const [snakeSegments, setSnakeSegments] = useState<SnakeSegments>(
    initialSnake
  )
  const [direction, setDirection] = useState<Position>(DIRECTION.LEFT)
  const [gameOver, setGameOver] = useState(false)

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
    tailSegment => tailSegment.x === head.x && tailSegment.y === head.y
  )

  if (intersectsWithItself && !gameOver) {
    setGameOver(true)
  }

  useInterval(
    () => {
      setSnakeSegments(segments => newSnakePosition(segments, direction))
    },
    gameOver ? null : 100
  )

  const tryAgain = () => {
    setSnakeSegments(initialSnake)
    setDirection(DIRECTION.LEFT)
    setGameOver(false)
  }

  return (
    <div className={styles.game_box}>
      <h1 className={styles.game_title}>Snake game</h1>

      <div className={styles.grid}>
        {intersectsWithItself ? (
          <YouDied cb={tryAgain} />
        ) : (
          FIELD_ROW.map(y => (
            <div className={styles.row} key={y}>
              {FIELD_ROW.map(x => (
                <div key={x}>
                  {getItem(x, y, snakeSegments) || (
                    <div className={styles.pixel} />
                  )}
                </div>
              ))}
            </div>
          ))
        )}
      </div>
      <div className={styles.keys}>
        <Keys />
      </div>
      <a href="https://github.com/vibecode/snake-game-web">Source code</a>
    </div>
  )
}

export default App
