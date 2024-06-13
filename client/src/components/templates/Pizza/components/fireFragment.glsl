uniform float uTime;
uniform float uRadius;
uniform sampler2D uTexture;

varying vec3 vPosition;
varying vec3 vNormal;
varying vec2 vUv;
varying float vDisplacement;
varying float vNoisePattern;

void main() {
  vec4 color = vec4(vNoisePattern, vNoisePattern, 0.0, 1.0);
  gl_FragColor = color;
}