uniform float uTime;
uniform float uRadius;
uniform sampler2D uTexture;

varying vec3 vPosition;
varying vec3 vNormal;
varying vec2 vUv;

void main() {
  vec2 uv = vUv;

  gl_FragColor = vec4(step(0.5, vec3(fract(uv.y * 10.09 + uTime))), 1);
}