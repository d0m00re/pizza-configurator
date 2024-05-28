import * as THREE from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import Pizza from './components/templates/Pizza/Pizza';
import { PizzaConfigurator } from './components/templates/Pizza';
import "./index.css";

function App() {
  return (
    <div id="canvas-container" className=" bg-slate-500 w-screen h-screen flex">
      
      <section className="flex-grow">
        <THREE.Canvas shadows>
          <ambientLight intensity={0.5} />
          <directionalLight color="white" position={[0, 0, 5]} />
          <Pizza />
          <PerspectiveCamera makeDefault position={[0, 2, 1]} />
          <OrbitControls target={[0, 0, 0]} />
        </THREE.Canvas>
      </section>
      <section className=" w-1/3 flex  justify-center items-center">
        <PizzaConfigurator />
      </section>
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
