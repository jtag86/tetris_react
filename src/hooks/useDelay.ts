import { useCallback, useState } from "react"
const defaultDelay = 250;
const nullDelay = null;
export const useDelay = () => {
  const [delay, setDelay] = useState<number | null>(defaultDelay);

  const startDelay = useCallback(() => {
    setDelay(defaultDelay);
  }, [])
  const stopDelay = useCallback(() => {
    setDelay(nullDelay);
  }, [])

  return [delay, startDelay, stopDelay] as const;
}
