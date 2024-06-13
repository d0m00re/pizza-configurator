import * as THREE from 'three';
import fireFragment from "./fireFragment.glsl?raw"
import fireVertex from "./fireVertex.glsl?raw";
import { useFrame } from '@react-three/fiber'

//const sphere = new THREE.SphereGeometry(1, 28, 28);
//const sphere = new THREE.PlaneGeometry(2, 2);
const sphere = new THREE.IcosahedronGeometry(1, 200);

// Create a custom shader material
const customMaterial = new THREE.ShaderMaterial({
  uniforms: {
    // Define your uniforms here if any
  },
  vertexShader: fireVertex,
  fragmentShader: fireFragment //fragmentShader
});

customMaterial.uniforms.uTime = { value: 0 }
function Fire() {
  /*
  const { myNumber } = useControls({
    name : "jackouille",
    myNumber : {
      value: 0.2,
      min : 0,
      max : 2,
      step : 0.05
    }
  })

  useEffect(() => {
    customMaterial.uniforms.uRadius ={value : myNumber};
  }, [myNumber])
  */

  useFrame((state, delta, xrFrame) => {
    customMaterial.uniforms.uTime.value += delta;
    // This function runs at the native refresh rate inside of a shared render-loop
  })


  return (
    <mesh
      position={[0, 0, 0]}
      geometry={sphere}
      material={customMaterial} />
  )
}

export default Fire;