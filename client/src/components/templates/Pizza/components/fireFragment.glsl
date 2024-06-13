uniform float uTime;
uniform float uRadius;
uniform sampler2D uTexture;

varying vec3 vPosition;
varying vec3 vNormal;
varying vec2 vUv;

varying float vDisplacement;

void main() {
  //vec2 uv = vUv;
//  gl_FragColor = vec4(step(0.5, vec3(fract(uv.y * 10.09 + uTime))), 1);
 // gl_FragColor = vec4(vec3(step(0.5, mod(uv.y * 10.09 + uTime, 1.0))), 1);
  // fit 0.2 - 0.7 to range 0.0 to 1



//  gl_FragColor = vec4(vec3(vDisplacement), 1);
 //   gl_FragColor = vec4(vec3(0.1, 0.3, 0.8), 1);
    gl_FragColor = vec4(vec3(vDisplacement + 0.1, vDisplacement + 0.3, vDisplacement + 0.8), 1);

}