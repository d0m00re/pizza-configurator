import React, { useRef, useEffect } from 'react'
import * as THREE from "@react-three/fiber";
import * as three from "three"
import * as obj from "./../../../../obj";
import { useGLTF } from '@react-three/drei';
import useCubeStore from '../../../../store/cube.zustand';

type Props = {}

function Main({ }: Props) {
    const { scene } = useGLTF(obj.cube);
    const meshRef = useRef<any>(null);
        const storeCube = useCubeStore();


    useEffect(() => {
        if (meshRef.current) {
            // Traverse through the scene to find the mesh and set its material
            meshRef.current?.traverse((child : any) => {
                if (child.isMesh) {
                    // Apply a new material to the mesh
                    child.material = new three.MeshStandardMaterial({ color: storeCube.color });
                }
            });
        }
    }, [scene, storeCube.color]);

    return (
            <object3D>
                <primitive
                    name="cubeConfig"
                    object={scene}
                    ref={meshRef}
                />
                <meshStandardMaterial
                    color={storeCube.color}
                />
            </object3D>
    )
}

export default Main