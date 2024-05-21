import React, { useRef, useEffect } from 'react'
import * as THREE from "@react-three/fiber";
import { useFrame } from '@react-three/fiber';
import * as three from "three"
import * as obj from "./../model";
import { useGLTF } from '@react-three/drei';
import usePizzaStore from './../Store/pizza.zustand';

function PizzaView() {
    const pizza = useGLTF(obj.pizzaRache);
    const olive = useGLTF(obj.olive);

    const meshRef = useRef<any>(null);
    const storePizza = usePizzaStore();

    useEffect(() => {
     //   console.log("olive : ")
        console.log(storePizza.olives)
    }, [storePizza.olives])
    

    useEffect(() => {
        if (meshRef.current) {
            // Traverse through the scene to find the mesh and set its material
            
            meshRef.current?.traverse((child : any) => {
                if (child.name === "basePizza" || child.name === "centerPizza") {
                    child.material = new three.MeshStandardMaterial({color : storePizza.colorBase})
                }
            })
        }
    }, [pizza.scene, storePizza.colorBase]);

    useFrame(() => {
       // console.log(storePizza.olives)
        storePizza.updateOlives();
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
                storePizza.olives.map((e, i) => <object3D position={e.pos}>
                    <primitive
                        key={`olive-${e.id}`}
                        object={olive.scene.clone()}
                    />
                </object3D>)
            }
        </object3D>
    )
}

export default PizzaView;