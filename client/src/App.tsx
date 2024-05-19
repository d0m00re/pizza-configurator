import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import CubeRenderer from './components/templates/CubeRenderer';
import * as THREE from "@react-three/fiber";
import { Stats, OrbitControls } from '@react-three/drei'
import ChooseColor from './components/templates/ChooseColor/ChooseColor';

function App() {
  return (
    <div id="canvas-container" style={{ width: "100vw", height: "100vh" }}>
      <ChooseColor />
      <THREE.Canvas shadows>
        <ambientLight intensity={0.1} />
        <directionalLight color="white" position={[0, 0, 5]} />
        <CubeRenderer />
        <OrbitControls />
      </THREE.Canvas>
    </div>
  )
}

export default App
