import { useState } from "react";
import { Button } from "@/components/ui/button";
import useStorePizza from "./../Store/pizza.zustand";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { BuySelector, IngredientSelector, SizeSelector, WaitCommand } from "./components";
import { TStepKind } from "../Store/pizza.zustand";

interface IStepPizza {
    id: number
    kind: TStepKind,
    cpn: () => JSX.Element
}


const stepArr: IStepPizza[] = [
    { id: 0, kind: "chooseSize", cpn: SizeSelector },
    { id: 1, kind: "chooseIngrediant", cpn: IngredientSelector },
    { id : 2, kind : "buy", cpn : BuySelector}
];

interface IRecordStep {
    id : number;
    cpn : () => JSX.Element;
}

const recordStep : Record<TStepKind, IRecordStep> = {
    "chooseIngrediant" : {id : 0, cpn : IngredientSelector},
    "chooseSize" : {id : 1, cpn : SizeSelector},
    "buy" : {id : 2, cpn : BuySelector},
    "waitCommand" : {id : 3, cpn : WaitCommand}
};

function PizzaConfigurator() {
    const storePizza = useStorePizza();

    const currentElem = recordStep[storePizza.step];
  
    return (
        <Card className=" bg-slate-400 h-3/4">
            <CardHeader>
                <CardTitle>Pizza configurator</CardTitle>
                <CardDescription className=" text-gray-800">Create your own custom pizza</CardDescription>
            </CardHeader>
            <CardContent>

            {

            }
                <currentElem.cpn />
              {/*              
                <IngredientSelector /> 

                <SizeSelector />
                */}
            </CardContent>
            <section className="flex gap-2 justify-center">
                {(storePizza.step === "chooseSize") ?
                    <Button onClick={storePizza.prevStep}>Prev</Button> : <></>
                }
                {(storePizza.step !== "buy") ?
                    <Button onClick={storePizza.nextStep}>Next</Button> : <></>
                }
                {(storePizza.step === "buy") ?
                    <Button onClick={storePizza.nextStep}>Buy</Button> : <></>
                }
         
            </section>
        </Card>
    )
}

export default PizzaConfigurator;