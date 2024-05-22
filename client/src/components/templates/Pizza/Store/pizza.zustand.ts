// src/store.ts
import { create } from 'zustand';
import type { } from '@redux-devtools/extension'; // required for devtools typing
import { IGenIngredient, IGenIngredientElem, IVect3d, TKindIngrediant, TKindPizzaSize, infoIngredient } from '../config/config';
import { rotate } from 'three/examples/jsm/nodes/Nodes.js';

export interface PizzaState {
  colorBase: string;
  ingredients: IGenIngredient[];
  setColorBase: (color: string) => void;

  addIngredient: (kind: TKindIngrediant, data : IGenIngredientElem) => void;
  addListIngr: (kind: TKindIngrediant, datas : IGenIngredientElem[]) => void;
  updateIngredient: () => void;
  setAllIngredient: (ingredient: IGenIngredient[]) => void;

  size : TKindPizzaSize;
  setSize : (size : TKindPizzaSize) => void;
}

let nextId = 0;

const usePizzaStore = create<PizzaState>((set) => ({
  colorBase: 'red',
  setColorBase: (color) => set(() => ({ colorBase: color })),
  ingredients: [],
  addIngredient: (kind, data) =>
    set((state) => ({
      ...state,
      ingredients: [
        ...state.ingredients,
        {
          kind: kind,
          id: nextId++,
          pos : data.pos,
          rot : data.rot,
          velocity: [0, 0, 0]
        },
      ]
    })),
  addListIngr: (kind, datas) => {
    let newIngredients : IGenIngredient[] = datas.map((data, i) => ({
      kind : kind,
      pos : data.pos,
      rot : data.rot,
      velocity : [0,0,0],
      id : nextId + i
    }));

    nextId += newIngredients.length;

    set((state) => ({
      ...state,
      ingredients: [
        ...state.ingredients,
        ...newIngredients
      ]
    }))
  },
  updateIngredient: () =>
    set((state) => ({
      ingredients: state.ingredients.map((ingredient) => ({
        ...ingredient,
        pos: [
          ingredient.pos[0],
          Math.max(ingredient.pos[1] + ingredient.velocity[1], infoIngredient[ingredient.kind].endZ),
          ingredient.pos[2],
        ],
        velocity: [
          ingredient.velocity[0],
          ingredient.velocity[1] - 0.01, // Apply gravity
          ingredient.velocity[2],
        ],
      })),
    })),
  setAllIngredient: (ingredients) => set({ ingredients }),

  size : "small",
  setSize : (size) => set({size})
}));

export default usePizzaStore;