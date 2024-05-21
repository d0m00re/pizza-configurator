import './App.css'
import * as THREE from "@react-three/fiber";
import { Stats, OrbitControls } from '@react-three/drei';
import * as Cube from "./components/templates/Cube";
import Pizza from './components/templates/Pizza/Pizza';
import { PizzaConfigurator } from './components/templates/Pizza';

function App() {
  return (
    <div id="canvas-container" style={{ width: "100vw", height: "100vh" }}>
      <PizzaConfigurator />
      <THREE.Canvas shadows>
        <ambientLight intensity={0.5} />
        <directionalLight color="white" position={[0, 0, 5]} />
        <Pizza />
        <OrbitControls />
      </THREE.Canvas>
    </div>
  )
}

/*
function App() {
  return (
    <div id="canvas-container" style={{ width: "100vw", height: "100vh" }}>
      <Cube.CubeChooseColor />
      <THREE.Canvas shadows>
        <ambientLight intensity={0.1} />
        <directionalLight color="white" position={[0, 0, 5]} />
        <Cube.CubeRenderer />
        <OrbitControls />
      </THREE.Canvas>
    </div>
  )
}
*/

export default App
