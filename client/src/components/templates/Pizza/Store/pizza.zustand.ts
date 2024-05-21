// src/store.ts
import { create } from 'zustand';
import type {} from '@redux-devtools/extension'; // required for devtools typing
type IVect3d = [number, number, number];

export interface IOlive {
  id: number;
  pos: IVect3d;
  velocity: IVect3d;
}

export interface PizzaState {
  colorBase: string;
  setColorBase: (color: string) => void;
  olives: IOlive[];
  addOlive: (pos: IVect3d) => void;
  updateOlives: () => void;
}

let nextId = 0;

const usePizzaStore = create<PizzaState>((set) => ({
  colorBase: '#ffffff',
  setColorBase: (color) => set(() => ({ colorBase: color })),

  olives: [],
  addOlive: (pos) =>
    set((state) => ({
      olives: [
        ...state.olives,
        { id: nextId++, pos, velocity: [0, 0, 0] },
      ],
    })),
  updateOlives: () =>
    set((state) => ({
      olives: state.olives.map((olive) => ({
        ...olive,
        pos: [
          olive.pos[0],
          ((olive.pos[1] + olive.velocity[1]) > 0) ? (olive.pos[1] + olive.velocity[1]) : 0,
          olive.pos[2],
        ],
        velocity: [
          olive.velocity[0],
          olive.velocity[1] - 0.01, // Apply gravity
          olive.velocity[2],
        ],
      })),
    })),
}));

export default usePizzaStore;