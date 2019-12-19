import { useRef, useEffect } from 'react'

export default (callback: () => void, delay: number) => {
  const savedCallback = useRef<any>()

  useEffect(() => {
    savedCallback.current = callback
  })

  useEffect(() => {
    function tick() {
      savedCallback.current()
    }
    if (delay !== null) {
      const id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
  }, [delay])
}
