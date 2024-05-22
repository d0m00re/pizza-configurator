// src/store.ts
import { create } from 'zustand';
import type { } from '@redux-devtools/extension'; // required for devtools typing
type IVect3d = [number, number, number];

type TKindIngrediant = "mushroom" | "olive" | "chorizon";

export interface IGenElem {
  kind: TKindIngrediant;
  id: number;
  pos: IVect3d;
  velocity: IVect3d;
}

export interface IOlive extends IGenElem { };
export interface IChorizon extends IGenElem { };
export interface IMushroom extends IGenElem { };

export interface PizzaState {
  colorBase: string;
  ingredients: IGenElem[];
  setColorBase: (color: string) => void;

  addIngredient: (kind: TKindIngrediant, pos: IVect3d) => void;
  updateIngredient: () => void;
  setAllIngredient: (ingredient: IGenElem[]) => void;
}

let nextId = 0;

const usePizzaStore = create<PizzaState>((set) => ({
  colorBase: 'red',
  setColorBase: (color) => set(() => ({ colorBase: color })),
  ingredients: [],
  addIngredient: (kind, pos) =>
    set((state) => ({
      ...state,
      ingredients: [
        ...state.ingredients,
        { kind: kind, id: nextId++, pos, velocity: [0, 0, 0] },
      ]
    })),
  updateIngredient: () =>
    set((state) => ({
      ingredients: state.ingredients.map((ingredient) => ({
        ...ingredient,
        pos: [
          ingredient.pos[0],
          Math.max(ingredient.pos[1] + ingredient.velocity[1], 0.02),
          ingredient.pos[2],
        ],
        velocity: [
          ingredient.velocity[0],
          ingredient.velocity[1] - 0.01, // Apply gravity
          ingredient.velocity[2],
        ],
      })),
    })),
  setAllIngredient: (ingredients) => set({ ingredients })
}));

export default usePizzaStore;