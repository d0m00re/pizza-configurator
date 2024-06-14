import * as THREE from "@react-three/fiber";
import { PerspectiveCamera } from '@react-three/drei';
import Pizza from './components/templates/Pizza/Pizza';
import { PizzaConfigurator } from './components/templates/Pizza';
import Camera from "./components/templates/Pizza/components/Camera";
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
          <Camera />
        </THREE.Canvas>
      </section>
      
      <section className=" w-1/3 flex  justify-center items-center">
        <PizzaConfigurator />
      </section>
    </div>
  )
}

export default App
