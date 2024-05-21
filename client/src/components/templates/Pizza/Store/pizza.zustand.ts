// src/store.ts
import { create } from 'zustand';
import type {} from '@redux-devtools/extension'; // required for devtools typing
type IVect3d = [number, number, number];

export interface IGenElem {
  id: number;
  pos: IVect3d;
  velocity: IVect3d;
}

export interface IOlive extends IGenElem {};
export interface IChorizon extends IGenElem {};
export interface IMushroom extends IGenElem {};

export interface PizzaState {
  colorBase: string;
  olives: IOlive[];
  chorizons: IChorizon[];
  mushrooms : IMushroom[];

  setColorBase: (color: string) => void;

  addOlive: (pos: IVect3d) => void;
  updateOlives: () => void;
  setAllOlives: (olives : IOlive[]) => void;

  addChorizons: (pos : IVect3d) => void;
  updateChorizons: () => void;
  setAllChorizons: (chorizon : IChorizon[]) => void;

  addMushroom: (pos : IVect3d) => void;
  updateMushroom: () => void;
  setAllMushroom: (mushroom : IMushroom[]) => void;
}

let nextId = 0;

const usePizzaStore = create<PizzaState>((set) => ({
  colorBase: 'red',
  setColorBase: (color) => set(() => ({ colorBase: color })),

  olives: [],
  chorizons : [],
  mushrooms : [],
  addOlive: (pos) =>
    set((state) => ({
      ...state,
      olives: [
        ...state.olives, 
        { id: nextId++, pos, velocity: [0, 0, 0] },
      ]
    })),
  updateOlives: () =>
    set((state) => ({
      olives: state.olives.map((olive) => ({
        ...olive,
        pos: [
          olive.pos[0],
          Math.max(olive.pos[1] + olive.velocity[1], 0.02),
          olive.pos[2],
        ],
        velocity: [
          olive.velocity[0],
          olive.velocity[1] - 0.01, // Apply gravity
          olive.velocity[2],
        ],
      })),
    })),
    setAllOlives: (olives) => set({ olives }),

    addChorizons: (pos) =>
      set((state) => ({
        ...state,
        chorizons: [
          ...state.chorizons, 
          { id: nextId++, pos, velocity: [0, 0, 0] },
        ]
      })),
    updateChorizons: () =>
      set((state) => ({
        chorizons: state.chorizons.map((chorizon) => ({
          ...chorizon,
          pos: [
            chorizon.pos[0],
            Math.max(chorizon.pos[1] + chorizon.velocity[1], 0.02),
            chorizon.pos[2],
          ],
          velocity: [
            chorizon.velocity[0],
            chorizon.velocity[1] - 0.01, // Apply gravity
            chorizon.velocity[2],
          ],
        })),
      })),
      setAllChorizons: (chorizons) => set({ chorizons }),

    
    addMushroom: (pos) =>
      set((state) => ({
        ...state,
        mushrooms: [
          ...state.mushrooms, 
          { id: nextId++, pos, velocity: [0, 0, 0] },
        ]
      })),
    updateMushroom: () =>
      set((state) => ({
        mushrooms: state.mushrooms.map((slice) => ({
          ...slice,
          pos: [
            slice.pos[0],
            Math.max(slice.pos[1] + slice.velocity[1], 0.02),
            slice.pos[2],
          ],
          velocity: [
            slice.velocity[0],
            slice.velocity[1] - 0.01, // Apply gravity
            slice.velocity[2],
          ],
        })),
      })),
      setAllMushroom: (mushrooms) => set({ mushrooms })
}));

export default usePizzaStore;