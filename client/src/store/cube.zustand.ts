import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import type {} from '@redux-devtools/extension' // required for devtools typing

interface CubeState {
  color: string;
  setColor: (color: string) => void
}

const useCubeStore = create<CubeState>()(
  devtools(
    persist(
      (set) => ({
        color: "green",
        setColor: (color) => set((state) => ({ color: color })),
      }),
      {
        name: 'bear-storage',
      },
    ),
  ),
)

export default useCubeStore;
