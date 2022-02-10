import React, { useState, createContext, ReactNode, useContext, useCallback, useEffect } from 'react'
import { Bird } from '@types'
import { getBirds } from '@controllers'

interface ApplicationContext {
  birds: Bird[],
  setBirds: (set: Bird[]) => void
}

interface Props {
  children: ReactNode
}

export const __ApplicationContext = createContext<ApplicationContext>({
  birds: [],
  setBirds: () => {}
})

export const ApplicationContext = ({ children }: Props) => {
  const [birds, setBirds] = useState<Bird[]>([])

  const fetchBirds = useCallback(async () => {
    const birds = await getBirds()
    setBirds(birds)
  }, [])

  useEffect(() => {
    fetchBirds()
  }, [fetchBirds])

  return (
    <__ApplicationContext.Provider
      value={{
        birds,
        setBirds
      }}
    >
      {children}
    </__ApplicationContext.Provider>
  )
}

export const useApplicationContext = (): ApplicationContext => useContext(__ApplicationContext)
