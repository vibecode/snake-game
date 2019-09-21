import React, { useState, useEffect, useCallback } from 'react'
import { DIRECTION, FIELD_ROW, ARROW, Position } from './types'
import { useInterval } from './useInterval'
import { newSnakePosition } from './calcPositions'
import { getItem } from './getItem'
import YouDied from './YouDied'
import Keyboard from './Keyboard'
import styles from './App.module.scss'

export interface SnakeSegments extends Array<Position> {}

const initialSnake = [{ x: 8, y: 8 }, { x: 8, y: 7 }, { x: 8, y: 6 }]

const App: React.FC = () => {
  const [snakeSegments, setSnakeSegments] = useState<SnakeSegments>(
    initialSnake
  )
  const [direction, setDirection] = useState<Position>(DIRECTION.LEFT)
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(false)

  const handleKeyPress = useCallback((ev: KeyboardEvent) => {
    ev.preventDefault()
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
      setSnakeSegments(segments =>
        newSnakePosition(segments, direction, score, setScore)
      )
    },
    gameOver ? null : 100
  )

  const tryAgain = () => {
    setSnakeSegments(initialSnake)
    setDirection(DIRECTION.LEFT)
    setScore(0)
    setGameOver(false)
  }

  const onUpTouch = () => {
    setDirection(DIRECTION.TOP)
  }
  const onDownTouch = () => {
    setDirection(DIRECTION.BOTTOM)
  }
  const onLeftTouch = () => {
    setDirection(DIRECTION.LEFT)
  }
  const onRightTouch = () => {
    setDirection(DIRECTION.RIGHT)
  }

  return (
    <div className={styles.game_box}>
      <h1 className={styles.game_title}>Snake game</h1>
      <p className={styles.score}>Score: {score}</p>
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
      <Keyboard
        upCb={onUpTouch}
        downCb={onDownTouch}
        leftCb={onLeftTouch}
        rightCb={onRightTouch}
      />
      <a
        className={styles.link}
        href="https://github.com/vibecode/snake-game-web"
      >
        Source code
      </a>
    </div>
  )
}

export default App
