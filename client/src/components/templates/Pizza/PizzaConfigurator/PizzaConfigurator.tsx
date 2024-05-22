import useStorePizza from "./../Store/pizza.zustand";
import { TKindIngrediant, basePizzaColor, infoIngredient, IGenIngredientElem } from '../config/config';
import { genPosRandom } from '../utils/utils';

// new pts generation
const newPtsGeneration = (kind: TKindIngrediant) => {
    // get
    let nbPopPts = infoIngredient[kind].nbPop;

    let arrPts = [];
    for (let i = 0; i < nbPopPts; i++) {
        arrPts.push(genPosRandom());
    }
    return arrPts;
}


// new pts generation
const newDataIngrediantGeneration = (kind: TKindIngrediant) => {
    // get
    let nbPopPts = infoIngredient[kind].nbPop;

    let arrPts : IGenIngredientElem[] = [];
    for (let i = 0; i < nbPopPts; i++) {
        arrPts.push({
            pos : genPosRandom(),
            rot : [0, Math.random() * 2, 0]
        });
    }
    return arrPts;
}

function PizzaConfigurator() {
    const storePizza = useStorePizza();

    return (
        <section style={{display : 'flex', alignItems : "center", flexDirection: "column", gap : "2px"}}>
            <div style={{display : "flex", flexDirection : "row", gap : "2px"}}>
                {
                    basePizzaColor.map(e => <button
                        key={`pizza-config-${e}`}
                        onClick={() => storePizza.setColorBase(e)}>{e}
                    </button>)
                }
            </div>
            <div style={{display : 'flex', flexDirection : "row", gap : "2px"}}>
                <button onClick={() => {
                    storePizza.addListIngr("olive", newDataIngrediantGeneration("olive"));
                }}>
                    Add olive {storePizza.ingredients.filter(e => e.kind === "olive").length}
                </button>

                <button onClick={() => {
                    storePizza.addListIngr("chorizon", newDataIngrediantGeneration("chorizon"));

                }}>
                    Add chorizon {storePizza.ingredients.filter(e => e.kind === "chorizon").length}
                </button>

                <button onClick={() => {
                    storePizza.addListIngr("mushroom", newDataIngrediantGeneration("mushroom"));
                }}>
                    Add mushroom slice {storePizza.ingredients.filter(e => e.kind === "mushroom").length}
                </button>
            </div>

            {/* later use an array for generate the button list */}
            <div style={{display : 'flex', flexDirection : "row", gap : "2px"}}>
                <h3>pizza size : </h3>
                <button onClick={() => storePizza.setSize("small")}>small</button>
                <button onClick={() => storePizza.setSize("medium")}>medium</button>
                <button onClick={() => storePizza.setSize("xl")}>xl</button>
            </div>
        </section>
    )
}

export default PizzaConfigurator