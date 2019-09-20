//See Dan Abramovs post
//https://overreacted.io/making-setinterval-declarative-with-react-hooks/

import { useEffect, useRef } from 'react'

type callback = () => void

export function useInterval(cb: callback, delay: number | null) {
  const savedCallback = useRef(() => {})

  useEffect(() => {
    savedCallback.current = cb
  }, [cb])

  useEffect(() => {
    if (delay !== null) {
      let id = setInterval(() => savedCallback.current(), delay)
      return () => clearInterval(id)
    }
  }, [delay])
}
