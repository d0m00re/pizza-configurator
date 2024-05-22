export type IVect3d = [number, number, number];
export type TKindIngrediant = "mushroom" | "olive" | "chorizon";

export interface IGenElem {
    kind: TKindIngrediant;
    id: number;
    pos: IVect3d;
    velocity: IVect3d;
}

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