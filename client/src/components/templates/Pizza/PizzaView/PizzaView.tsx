import React, { useRef, useEffect, useState } from 'react'
import * as THREE from "@react-three/fiber";
import { useFrame } from '@react-three/fiber';
import * as obj from "./../model";
import { useGLTF } from '@react-three/drei';
import usePizzaStore from './../Store/pizza.zustand';
import { IVect3d, infoSizePizza } from '../config/config';
import cloneDeep from "lodash/cloneDeep";

const C_PI_RAD = 3.1415926536;

interface IObjectInfo {
    pizzaInfo: {
        position: IVect3d;
        rotation: IVect3d;
    },
    toolInfo: {
        position: IVect3d;
        rotation: IVect3d;
    }
}

const makeEmptyObjectInfo = (): IObjectInfo => {
    return {
        pizzaInfo: {
            position: [0, 0, 0],
            rotation: [0, 0, 0]
        },
        toolInfo: {
            position: [0, -0.1, 0],
            rotation: [0, 0, 0]
        }
    }
}

/**
 * each array elem describe animation step with target position and rotation
 */
const animationStep = [
    {
        pizzaInfo : {
            position : [0,0,0],
            rotation : [0,0,0]
        },
        toolInfo: {
            position: [0, -0.1, 0],
            rotation: [0, 0, 0]
        }
    }
]

function PizzaView() {

    const [objectInfo, setObjectInfo] = useState<IObjectInfo>(makeEmptyObjectInfo());
    const threeRef = THREE.useThree();
    const pizzaModel = useGLTF(obj.pizzaRache);
    const oliveModel = useGLTF(obj.olive);
    const chorizoModel = useGLTF(obj.chorizon);
    const mushroomModel = useGLTF(obj.mushroomSlice);
    const toolModel = useGLTF(obj.pizzaTool);
    const hovenModel = useGLTF(obj.hoven);

    const meshRef = useRef<any>(null);
    const storePizza = usePizzaStore();

    useEffect(() => {
        if (meshRef.current) {
            // Traverse through the scene to find the mesh and set its material

            {/*}
            meshRef.current?.traverse((child: any) => {
                if (child.name === "basePizza" || child.name === "centerPizza") {
                    child.material = new three.MeshStandardMaterial({ color: storePizza.colorBase })
                }
            })
        */}
        }
    }, [pizzaModel.scene, storePizza.colorBase]);

    useFrame(() => {
        storePizza.updateIngredient();

        //
        console.log("step : ", storePizza.step)
        if (storePizza.step === "waitCommand") {
            let dup = cloneDeep(objectInfo);

            if (objectInfo.pizzaInfo.rotation[1] > -(C_PI_RAD / 2)) {
                dup.pizzaInfo.rotation[1] -= 0.08;
            } else {

            }

            if (dup.pizzaInfo.position[0] < 3) {
                dup.pizzaInfo.position[0] += 0.15;
            } else if (dup.pizzaInfo.position[2] > -4) {
                dup.pizzaInfo.position[2] -= 0.2;
            }

            setObjectInfo(dup);
        }
    })

    return (
        <>
            <pointLight position={[0, 1, 0]} intensity={1} color="#fff" />
            <object3D
                scale={infoSizePizza[storePizza.size].scale}
                position={objectInfo.pizzaInfo.position}
                rotation={objectInfo.pizzaInfo.rotation}    
            >
                <primitive
                    name="pizzaConfig"
                    object={pizzaModel.scene}
                    ref={meshRef}
                />
            </object3D>
            <object3D>
                {(storePizza.step === "buy" || storePizza.step === "waitCommand") ?
                    <object3D
                        position={objectInfo.toolInfo.position}
                        rotation={objectInfo.toolInfo.rotation}>
                        <primitive
                            name="pizzaTool"
                            object={toolModel.scene}
                            ref={meshRef}
                        />
                    </object3D> : <></>
                }

                {
                    (storePizza.step === "buy" || storePizza.step === "waitCommand") ?
                        <object3D
                            position={[3, 0, -5]}
                            rotation={[0, -C_PI_RAD / 2, 0]}
                        >
                            <primitive
                                name="hoven"
                                object={hovenModel.scene}
                                ref={meshRef}
                            />
                        </object3D> : <></>
                }
                {/*
            <meshStandardMaterial
                color={storePizza.colorBase}
            />
    */}
                {
                    storePizza.ingredients.filter(e => e.kind === "olive").map((e) => <object3D key={`olive-${e.id}`} rotation={e.rot} position={e.pos}>
                        <primitive
                            object={oliveModel.scene.clone()}
                        />
                    </object3D>)
                }
                {
                    storePizza.ingredients.filter(e => e.kind === "chorizon").map((e) => <object3D key={`chorizon-${e.id}`} rotation={e.rot} position={e.pos}>
                        <primitive

                            object={chorizoModel.scene.clone()}
                        />
                    </object3D>)
                }
                {
                    storePizza.ingredients.filter(e => e.kind === "mushroom").map((e) => <object3D key={`mushroom-${e.id}`} rotation={e.rot} position={e.pos}>
                        <primitive
                            object={mushroomModel.scene.clone()}
                        />
                    </object3D>)
                }
            </object3D>
            <axesHelper />
        </>
    )
}

export default PizzaView;