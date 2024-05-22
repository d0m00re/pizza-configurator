import React, { useRef, useEffect } from 'react'
import * as THREE from "@react-three/fiber";
import { useFrame } from '@react-three/fiber';
import * as three from "three"
import * as obj from "./../model";
import { useGLTF } from '@react-three/drei';
import usePizzaStore from './../Store/pizza.zustand';

function PizzaView() {
    const threeRef = THREE.useThree();
    const pizza = useGLTF(obj.pizzaRache);
    const olive = useGLTF(obj.olive);
    const chorizo = useGLTF(obj.chorizon);
    const mushroom = useGLTF(obj.mushroomSlice);

    const meshRef = useRef<any>(null);
    const storePizza = usePizzaStore();

    useEffect(() => {
        if (meshRef.current) {
            // Traverse through the scene to find the mesh and set its material

            meshRef.current?.traverse((child: any) => {
                if (child.name === "basePizza" || child.name === "centerPizza") {
                    child.material = new three.MeshStandardMaterial({ color: storePizza.colorBase })
                }
            })
        }
    }, [pizza.scene, storePizza.colorBase]);
 
    useFrame(() => {
            storePizza.updateIngredient();
    })
    

    return (
        <object3D>
            <primitive
                name="pizzaConfig"
                object={pizza.scene}
                ref={meshRef}
            />
            <meshStandardMaterial
                color={storePizza.colorBase}
            />

            {
                storePizza.ingredients.filter(e => e.kind === "olive").map((e, i) => <object3D key={`olive-${e.id}`} position={e.pos}>
                    <primitive
                        object={olive.scene.clone()}
                    />
                </object3D>)
            }
            {
                storePizza.ingredients.filter(e => e.kind === "chorizon").map((e, i) => <object3D key={`chorizon-${e.id}`} position={e.pos}>
                    <primitive
                        object={chorizo.scene.clone()}
                    />
                </object3D>)
            }
            {
                storePizza.ingredients.filter(e => e.kind === "mushroom").map((e, i) => <object3D key={`mushroom-${e.id}`} position={e.pos}>
                    <primitive
                        object={mushroom.scene.clone()}
                    />
                </object3D>)
            }
        </object3D>
    )
}

export default PizzaView;