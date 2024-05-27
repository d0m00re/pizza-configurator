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

function PizzaConfigurator() {

    return (
        <Card className=" bg-slate-400 w-full">
            <CardHeader>
                <CardTitle>Pizza configurator</CardTitle>
                <CardDescription className=" text-gray-800">Create your own custom pizza</CardDescription>
            </CardHeader>
            <CardContent>
                {/*}
                <div style={{ display: "flex", flexDirection: "row", gap: "2px" }}>
                    {
                        basePizzaColor.map(e => <button
                            key={`pizza-config-${e}`}
                            onClick={() => storePizza.setColorBase(e)}>{e}
                        </button>)
                    }
                </div>
                */}
                <IngredientSelector />

                <SizeSelector />
            </CardContent>
            <Button onClick={() => alert("buy")}>Buy</Button>
        </Card>
    )
}

export default PizzaConfigurator;