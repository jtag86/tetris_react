import { useState, useCallback } from 'react'

export const useGameOver = () => {
  const [gameOver, setGameOver] = useState(true)

  const startGameOver = useCallback(() => {
    setGameOver(false)
  }, [])

  const stopGameOver = useCallback(() => {
    setGameOver(true)
  }, [])

  return [gameOver, startGameOver, stopGameOver] as const
}
