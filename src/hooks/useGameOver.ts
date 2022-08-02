import { useState, useCallback } from 'react'

export const useGameOver = () => {
  const [gameOver, setGameOver] = useState(true)

  const restartGameOver = useCallback(() => {
    setGameOver(false)
  }, [])

  return [gameOver, setGameOver, restartGameOver] as const
}
