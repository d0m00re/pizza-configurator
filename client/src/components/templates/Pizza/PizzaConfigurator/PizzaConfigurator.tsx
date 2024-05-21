import React from 'react'
import useStorePizza from "./../Store/pizza.zustand";
const color = [
    "red",
    "yellow",
    "green"
]

export type IVect3d = [number, number, number];

const genOlivePosRandom = () : IVect3d => {
    //return [0.1, 1, 0.1];
    return [Math.random() * 1 - 0.5, 1, Math.random() * 1 - 0.5];
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
                const position: [number, number, number] = genOlivePosRandom();
                console.log("onCLick")
                storePizza.addOlive(position);
            }}>
                Add olive {storePizza.olives.length}
            </button>
        </section>
    )
}

export default PizzaConfigurator