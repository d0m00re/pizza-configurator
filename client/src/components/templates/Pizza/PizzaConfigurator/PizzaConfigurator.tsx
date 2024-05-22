import React from 'react'
import useStorePizza from "./../Store/pizza.zustand";
import { basePizzaColor } from '../config/config';
import { genPosRandom } from '../utils/utils';

function PizzaConfigurator() {
    const storePizza = useStorePizza();

    return (
        <section>
            {
                basePizzaColor.map(e => <button
                    key={`pizza-config-${e}`}
                    onClick={() => storePizza.setColorBase(e)}>{e}
                </button>)
            }
            <button onClick={() => {
                const position: [number, number, number] = genPosRandom();
                storePizza.addIngredient("olive",position);
            }}>
                Add olive {storePizza.ingredients.filter(e => e.kind === "olive").length}
            </button>

            <button onClick={() => {
                const position: [number, number, number] = genPosRandom();
                storePizza.addIngredient("chorizon", position);
            }}>
                Add chorizon {storePizza.ingredients.filter(e => e.kind === "chorizon").length}
            </button>

            <button onClick={() => {
                const position: [number, number, number] = genPosRandom();
                storePizza.addIngredient("mushroom", position);
            }}>
                Add mushroom slice {storePizza.ingredients.filter(e => e.kind === "mushroom").length}
            </button>
        </section>
    )
}

export default PizzaConfigurator