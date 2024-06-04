export type IVect3d = [number, number, number];
export type TKindIngrediant = "mushroom" | "olive" | "chorizon";
export type TKindPizzaSize = "small" | "medium" | "xl";

export interface IGenIngredient {
    kind: TKindIngrediant;
    id: number;
    pos: IVect3d;
    rot : IVect3d;
    velocity: IVect3d;
}

export type IGenIngredientElem = Pick<IGenIngredient, "pos" | "rot">;

export const basePizzaColor = [
    "red",
    "yellow",
    "green"
];

// moore info
export interface IInfoIngredient {
    endZ : number; // where we want to stop it
    nbPop : number; // nb elem pop each time
}
export const infoIngredient : Record<TKindIngrediant, IInfoIngredient> = {
    mushroom : {endZ : 0.03, nbPop : 2},
    olive : {endZ : 0.02, nbPop : 3},
    chorizon : {endZ : 0.02, nbPop : 4}
}

/*
** base unit model
*/
export interface IInfoSize {
    scale : IVect3d;   
}

export const infoSizePizza : Record<TKindPizzaSize, IInfoSize> = {
    small  :{ scale : [1, 1, 1]},
    medium  :{ scale : [1.5, 1.5, 1.5]},
    xl  :{ scale : [2, 2, 2]},

}