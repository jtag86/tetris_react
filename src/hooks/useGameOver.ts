import { useState, useCallback } from 'react'
import pressMenuButtonSound from '../assets/sound/pressMenuButton.wav'
const pressMenuButton = new Audio(pressMenuButtonSound)

export const useGameOver = () => {
  const [gameOver, setGameOver] = useState(true)

  const startGameOver = useCallback(() => {
    pressMenuButton.play();
    setGameOver(false)
  }, [])

  const stopGameOver = useCallback(() => {
    setGameOver(true)
  }, [])

  return [gameOver, startGameOver, stopGameOver] as const
}
