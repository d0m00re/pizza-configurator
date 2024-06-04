import React, { useRef, useEffect } from 'react'
import * as THREE from "@react-three/fiber";
import { useFrame } from '@react-three/fiber';
import * as three from "three"
import * as obj from "./../model";
import { useGLTF } from '@react-three/drei';
import usePizzaStore from './../Store/pizza.zustand';
import { infoSizePizza } from '../config/config';

const C_PI_RAD = 3.1415926536;

function PizzaView() {
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
    })

    return (
        <>
            <pointLight position={[0, 1, 0]} intensity={1} color="#fff" />
            <object3D scale={infoSizePizza[storePizza.size].scale}>
                <primitive
                    name="pizzaConfig"
                    object={pizzaModel.scene}
                    ref={meshRef}
                />
                {(storePizza.step === "buy" || storePizza.step === "waitCommand") ?
                    <object3D position={[0, -0.1, 0]}>
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
                            position={[3,0,-5]}
                            rotation={[0, -C_PI_RAD / 2,0]}
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