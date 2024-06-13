import * as THREE from 'three';
import fireFragment from "./shaderFragment.glsl?raw"
import fireVertex from "./shaderVertex.glsl?raw";
import { useFrame } from '@react-three/fiber'


//const sphere = new THREE.SphereGeometry(1, 28, 28);
const sphere = new THREE.PlaneGeometry(4, 4, 50, 50);
//const sphere = new THREE.IcosahedronGeometry(1, 200);


// Create a custom shader material

const customMaterial = new THREE.ShaderMaterial({
  uniforms: {
    uTime: { value: 0 },
    vMouse: { value: [0, 0] },
    vResolutions: { value: [500, 500] }
  },
  vertexShader: fireVertex,
  fragmentShader: fireFragment //fragmentShader
});


customMaterial.uniforms.u_time = { value: 0 }
function Fire2d() {
  useFrame((state, delta, xrFrame) => {
    // console.log(customMaterial.uniforms.vTime.value);
    customMaterial.uniforms.uTime.value += delta;
  });


  return (
    <mesh
      position={[0, 0, 0]}
      geometry={sphere}
      material={customMaterial} />
  )
}

export default Fire2d;
