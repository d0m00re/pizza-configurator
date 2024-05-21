import React from 'react'
import useStorePizza from "./../Store/pizza.zustand";
const color = [
    "red",
    "yellow",
    "green"
]

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
                const position: [number, number, number] = [Math.random() * 2 - 1, 1, Math.random() * 2 - 1];
                storePizza.addOlive(position);
            }}>
                Add olive {storePizza.olives.length}
            </button>
        </section>
    )
}

export default PizzaConfigurator