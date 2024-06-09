import { Canvas } from '@react-three/fiber';

import { useRef } from 'react';

const fragmentShader = `
#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;

void main() {
  gl_FragData[0].color = vec4(1.0, 0.0, 1.0, 1.0);
}`;

const vertexShader = `
#ifdef GL_ES
precision mediump float;
#endif

attribute vec3 a_position;
attribute vec2 a_uv;
varying vec2 v_uv;

uniform float u_time;

void main() {
  gl_Position = vec4(a_position, 1.0);
  v_uv = a_uv;
}`;


const Fire = () => {
  const mesh = useRef<any>();


  return (
      <mesh ref={mesh} position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={1.5}>
        <planeGeometry attach="geometry" args={[1, 1, 32, 32]} />
        <shaderMaterial
        //  attachObject={['material']} 
          fragmentShader={fragmentShader}
          vertexShader={vertexShader}
          uniforms={{ time: { value: 0 } }} // Assuming you want to pass the current time as a uniform
        />
      </mesh>
  );
};

export default Fire;