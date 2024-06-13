import React, { useRef, useEffect, useState } from 'react'
import * as THREE from "@react-three/fiber";
import { useFrame } from '@react-three/fiber';
import * as obj from "./../model";
import { useGLTF } from '@react-three/drei';
import usePizzaStore from './../Store/pizza.zustand';
import { IVect3d, infoSizePizza } from '../config/config';
import cloneDeep from "lodash/cloneDeep";
import Fire from '../components/Fire';

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

interface IAnimationStep {
    object: IObjectInfo;
    nbStep: number;
}

const animationStepList: IAnimationStep[] = [
    {
        object: {
            pizzaInfo: {
                position: [3, 0, 0],
                rotation: [0, 0, 0]
            },
            toolInfo: {
                position: [3, 0, 0],
                rotation: [0, -(C_PI_RAD / 2), 0]
            }
        },
        nbStep: 50
    }, {
        object: {
            pizzaInfo: {
                position: [0, 0, -4],
                rotation: [0, 0, 0]
            },
            toolInfo: {
                position: [0, 0, -4],
                rotation: [0, 0, 0]
            }
        },
        nbStep: 50
    },{
        object: {
            pizzaInfo: {
                position: [0, 0, 0],
                rotation: [0, 0, 0]
            },
            toolInfo: {
                position: [0, 0, 10],
                rotation: [0, 0, 0]
            }
        },
        nbStep: 50
    }
];

const generatePointIncrement = (pts: IVect3d, nbStep: number): IVect3d => {
    return [
        pts[0] / nbStep,
        pts[1] / nbStep,
        pts[2] / nbStep
    ];
}

const addTwoVec3d = (v1 : IVect3d, v2 : IVect3d) : IVect3d => {
    return [
        v1[0] + v2[0],
        v1[1] + v2[1],
        v1[2] + v2[2]
    ]
}

const generateStepAnimation = (origin: IObjectInfo, animationStepL: IAnimationStep): IAnimationStep => {

    let _animationStep = cloneDeep(animationStepL);
    //
    _animationStep.object.pizzaInfo.position = generatePointIncrement(_animationStep.object.pizzaInfo.position, _animationStep.nbStep);
    _animationStep.object.pizzaInfo.rotation = generatePointIncrement(_animationStep.object.pizzaInfo.rotation, _animationStep.nbStep);

    _animationStep.object.toolInfo.position = generatePointIncrement(_animationStep.object.toolInfo.position, _animationStep.nbStep);
    _animationStep.object.toolInfo.rotation = generatePointIncrement(_animationStep.object.toolInfo.rotation, _animationStep.nbStep);


    return {
        object: _animationStep.object,
        nbStep: _animationStep.nbStep
    };
}

// 0) init
// 1) generate step animation for current position / rot

function PizzaView() {
    const [animationStep, setAnimationStep] = useState(0);
    const [animationData, setAnimationData] = useState<IAnimationStep>()
    const [objectInfo, setObjectInfo] = useState<IObjectInfo>(makeEmptyObjectInfo());
    const threeRef = THREE.useThree();
    const pizzaModel = useGLTF(obj.pizzaRache);
    const oliveModel = useGLTF(obj.olive);
    const chorizoModel = useGLTF(obj.chorizon);
    const mushroomModel = useGLTF(obj.mushroomSlice);
    const toolModel = useGLTF(obj.pizzaTool);
    const hovenModel = useGLTF(obj.hoven);
    const fireBuche = useGLTF(obj.fireBuche);

    const meshRef = useRef<any>(null);
    const storePizza = usePizzaStore();

    useEffect(() => {
        const dataAnimStep = generateStepAnimation(objectInfo, animationStepList[animationStep]);
        setAnimationData(dataAnimStep);
    }, [animationStep])
    

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
            if (animationData && animationData?.nbStep && animationData?.nbStep > 0) {
                let dupObjectInfo = cloneDeep(objectInfo);
                

                // update
                dupObjectInfo.pizzaInfo.position = addTwoVec3d(dupObjectInfo.pizzaInfo.position, animationData.object.pizzaInfo.position);
                dupObjectInfo.pizzaInfo.rotation = addTwoVec3d(dupObjectInfo.pizzaInfo.rotation, animationData.object.pizzaInfo.rotation);
                dupObjectInfo.toolInfo.position = addTwoVec3d(dupObjectInfo.toolInfo.position, animationData.object.toolInfo.position);
                dupObjectInfo.toolInfo.rotation = addTwoVec3d(dupObjectInfo.toolInfo.rotation, animationData.object.toolInfo.rotation);

                // @ts-ignore
                setAnimationData(old => ({...old, nbStep : old?.nbStep - 1}))
                setObjectInfo(dupObjectInfo);
            }
            else if (animationData?.nbStep === 0 && animationStep < animationStepList.length - 1) {
                setAnimationStep(old => old + 1);
            }
        }
    })

    return (
        <>
            <pointLight position={[0, 1, 0]} intensity={1} color="#fff" />

            <Fire />

            {/*}
            <object3D>
                <primitive
                    name="fireBuche"
                    object={fireBuche.scene}
                />
            </object3D>
       
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
             */}
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