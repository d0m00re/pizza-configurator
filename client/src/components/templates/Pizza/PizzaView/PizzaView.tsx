import React, { useRef, useEffect } from 'react'
import * as THREE from "@react-three/fiber";
import { useFrame } from '@react-three/fiber';
import * as three from "three"
import * as obj from "./../model";
import { useGLTF } from '@react-three/drei';
import usePizzaStore, { IOlive } from './../Store/pizza.zustand';

const genNewOliveWtVelocity = ({ olive, appliedVelo }: { olive: IOlive, appliedVelo: boolean }): IOlive => {
    return ({
        ...olive,
        pos: [
            olive.pos[0],
            (appliedVelo) ? olive.pos[1] + olive.velocity[1] : olive.pos[1],
            olive.pos[2],
        ],
        velocity: [
            olive.velocity[0],
            (appliedVelo) ? olive.velocity[1] - 0.01 : olive.velocity[1], // Apply gravity
            olive.velocity[2],
        ],
    })
}

function PizzaView() {
    const threeRef = THREE.useThree();
    const pizza = useGLTF(obj.pizzaRache);
    const olive = useGLTF(obj.olive);

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

    const updtOlive = (_olive: IOlive): IOlive => {
        let olive = _olive;
        const raycaster = new three.Raycaster(
            new three.Vector3(...olive.pos),
            new three.Vector3(0, -1, 0),
            0,
            10
        );
        
        let intersects: any[] = raycaster.intersectObjects(threeRef.scene.children);
        intersects = intersects.filter(e => e.object.name === 'centerPizza');

        if (intersects.length) {
            olive = genNewOliveWtVelocity({ olive, appliedVelo: intersects[0].distance > 0.1 });
        } else {
            olive = genNewOliveWtVelocity({ olive, appliedVelo: true });
        }
        
        return olive;
    }

    
    useFrame(() => {
        // use raytracer for predict next pos
        if (storePizza.olives.length) {
            let newOlives = storePizza.olives.map(olive => updtOlive(olive));
            storePizza.setAllOlives(newOlives);
            //raycaster.setFromCamera(mouse, threeRef.current.camera);

        }
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
                storePizza.olives.map((e, i) => <object3D key={`olive-${e.id}`} position={e.pos}>
                    <primitive
                        object={olive.scene.clone()}
                    />
                </object3D>)
            }
        </object3D>
    )
}

export default PizzaView;