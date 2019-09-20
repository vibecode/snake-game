import React from 'react'
import './YouDied.css'

interface Props {
  cb: () => void
}

const YouDied: React.FC<Props> = ({ cb }) => (
  <>
    <h1 className="died">You died</h1>
    <button className="died_button" onClick={cb}>
      Try again
    </button>
  </>
)

export default YouDied
