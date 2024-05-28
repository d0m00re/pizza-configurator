import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { IngredientSelector, SizeSelector } from "./components";

type TStepKind = "chooseSize" | "chooseIngrediant";
interface IStepPizza {
    id: number
    kind: TStepKind,
    cpn: () => JSX.Element
}


const stepArr: IStepPizza[] = [
    { id: 0, kind: "chooseSize", cpn: SizeSelector },
    { id: 1, kind: "chooseIngrediant", cpn: IngredientSelector }
];

function PizzaConfigurator() {
    const [currentStep, setCurrentStep] = useState<number>(0);
    const currentElem = stepArr[currentStep];
    const incr = () => {
        if (currentStep < stepArr.length - 1)
            setCurrentStep(old => old + 1)
    }
    const decr = () => {
        if (currentStep > 0)
            setCurrentStep(old => old - 1)
    }
    return (
        <Card className=" bg-slate-400 h-3/4">
            <CardHeader>
                <CardTitle>Pizza configurator</CardTitle>
                <CardDescription className=" text-gray-800">Create your own custom pizza</CardDescription>
            </CardHeader>
            <CardContent>

                <currentElem.cpn />
                {/*}            
                <IngredientSelector />

                <SizeSelector />
            */}
            </CardContent>
            <section className="flex gap-2 justify-center">
                {(currentStep > 0) ?
                    <Button onClick={decr}>Prev</Button> : <></>
                }
                {(currentStep < stepArr.length - 1) ?
                    <Button onClick={incr}>Next</Button> : <></>
                }
                {(currentStep === 1 ?
                    <Button onClick={() => alert("buy")}>Buy</Button> : <></>)
                }
            </section>
        </Card>
    )
}

export default PizzaConfigurator;

/*}
                <div style={{ display: "flex", flexDirection: "row", gap: "2px" }}>
                    {
                        basePizzaColor.map(e => <button
                            key={`pizza-config-${e}`}
                            onClick={() => storePizza.setColorBase(e)}>{e}
                        </button>)
                    }
                </div>
*/