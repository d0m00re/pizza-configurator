import * as THREE from 'three';
import fireFragment from "./fireFragment.glsl?raw"
import fireVertex from "./fireVertex.glsl?raw";
import { useControls } from 'leva'
import { useEffect } from 'react';
import colorfullTexture from "./image.jpg"

//const sphere = new THREE.SphereGeometry(1, 28, 28);
const sphere = new THREE.PlaneGeometry(2, 2);

// Create a custom shader material
const customMaterial = new THREE.ShaderMaterial({
  uniforms: {
    // Define your uniforms here if any
  },
 vertexShader: fireVertex,
 fragmentShader: fireFragment //fragmentShader
});

customMaterial.uniforms.uTime = {value : 0}
customMaterial.uniforms.uRadius = {value : 0.2};
customMaterial.uniforms.uTexture = {value : new THREE.TextureLoader().load(colorfullTexture)}
console.log(customMaterial.uniforms)
function Fire() {
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
  

  return (
     <mesh
      position={[0, 0, 0]}
      geometry={sphere}
      material={customMaterial} />
  )
}

export default Fire;