import React from 'react'
import useStorePizza from "./../Store/pizza.zustand";
const color = [
    "red",
    "yellow",
    "green"
]

function getRandomPointInCircle(radius: number): [number, number] {
    const theta = 2 * Math.PI * Math.random();
    const r = radius * Math.sqrt(Math.random());
  
    const x = r * Math.cos(theta);
    const y = r * Math.sin(theta);
  
    return [x, y];
  }

export type IVect3d = [number, number, number];

const genPosRandom = () : IVect3d => {
    //return [0.1, 1, 0.1];
    let posCircle = getRandomPointInCircle(0.45);
    return [posCircle[0], 1, posCircle[1]];
}

function PizzaConfigurator() {
    const storePizza = useStorePizza();

    return (
        <section>
            {
                color.map(e => <button
                    key={`pizza-config-${e}`}
                    onClick={() => storePizza.setColorBase(e)}>{e}
                </button>)
            }
            <button onClick={() => {
                const position: [number, number, number] = genPosRandom();
                console.log("onClick")
                storePizza.addIngredient("olive",position);
            }}>
                Add olive {storePizza.ingredients.filter(e => e.kind === "olive").length}
            </button>

            <button onClick={() => {
                const position: [number, number, number] = genPosRandom();
                console.log("onClick")
                storePizza.addIngredient("chorizon", position);
            }}>
                Add chorizon {storePizza.ingredients.filter(e => e.kind === "chorizon").length}
            </button>

            <button onClick={() => {
                const position: [number, number, number] = genPosRandom();
                console.log("onClick")
                storePizza.addIngredient("mushroom", position);
            }}>
                Add mushroom slice {storePizza.ingredients.filter(e => e.kind === "mushroom").length}
            </button>
        </section>
    )
}

export default PizzaConfigurator