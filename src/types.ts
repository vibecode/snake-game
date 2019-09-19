export enum ARROW {
  UP = 'ArrowUp',
  DOWN = 'ArrowDown',
  LEFT = 'ArrowLeft',
  RIGHT = '\u001B[C'
}

export interface Position {
  x: number
  y: number
}

export const DIRECTION = {
  RIGHT: { x: 1, y: 0 },
  LEFT: { x: -1, y: 0 },
  TOP: { x: 0, y: -1 },
  BOTTOM: { x: 0, y: 1 }
} as const

export type DIRECTION = keyof typeof DIRECTION

export const FIELD_SIZE = 16
export const FIELD_ROW = [...new Array(FIELD_SIZE).keys()]
