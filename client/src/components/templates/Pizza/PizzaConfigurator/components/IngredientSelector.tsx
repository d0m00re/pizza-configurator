import React from 'react'
import useStorePizza from "./../../Store/pizza.zustand";
import { IGenIngredientElem, TKindIngrediant, infoIngredient } from '../../config/config';
import { genPosRandom } from '../../utils/utils';
import { Button } from '@/components/ui/button';

/**
 * generate new pts
 * @param kind 
 * @returns 
 */
const newDataIngrediantGeneration = (kind: TKindIngrediant) => {
    // get
    let nbPopPts = infoIngredient[kind].nbPop;

    let arrPts: IGenIngredientElem[] = [];
    for (let i = 0; i < nbPopPts; i++) {
        arrPts.push({
            pos: genPosRandom(),
            rot: [0, Math.random() * 2, 0]
        });
    }
    return arrPts;
}

interface IIngredientAddDecr {
    children: string;
    add: () => void;
    decr: () => void;
}

const IconPlus = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
    )
}

const IconDecr = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
        </svg>

    )
}

const IngredientAddDecr = (props: IIngredientAddDecr) => {
    return (
        <section className='flex flex-row justify-between'>
            <Button onClick={props.add}>
                <IconPlus />
            </Button>
            <span>{props.children}</span>
            <Button onClick={props.decr}>
                <IconDecr />
            </Button>
        </section>
    )
}

const IngredientSelector = () => {
    const storePizza = useStorePizza();

    return (
        <section className='flex flex-col gap-2'>
            <h3 className=' text-xl'>aliments </h3>
            <div className='flex flex-col gap-2'>
                <IngredientAddDecr
                    add={() => storePizza.addListIngr("olive", newDataIngrediantGeneration("olive"))}
                    decr={() => storePizza.deleteListIngr("olive")}
                >
                    Olive
                </IngredientAddDecr>
                <IngredientAddDecr
                    add={() => storePizza.addListIngr("mushroom", newDataIngrediantGeneration("mushroom"))}
                    decr={() => storePizza.deleteListIngr("mushroom")}
                >
                    Mushroom
                </IngredientAddDecr>
                <IngredientAddDecr
                    add={() => storePizza.addListIngr("chorizon", newDataIngrediantGeneration("chorizon"))}
                    decr={() => storePizza.deleteListIngr("chorizon")}
                >
                    Chorizon
                </IngredientAddDecr>
            </div>
        </section>)
}

export default IngredientSelector