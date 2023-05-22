export const staticSpriteFragment = `
precision mediump float;

uniform vec4 uColor;

void main() {
  gl_FragColor = uColor;
}
`;

export const staticSpriteVertex = `
attribute vec2 aPosition;
uniform vec2 uResolution;

void main() {
  vec2 toClip = aPosition / uResolution;
  toClip = toClip * 2.0;
  toClip = toClip - 1.0;

  gl_Position = vec4(toClip, 0, 1);
}
`;

export const staticWorldFragment = `
precision mediump float;

uniform vec4 uColor;

void main() {
  gl_FragColor = uColor;
}
`;

export const staticWorldVertex = `
attribute vec4 aPosition;
uniform mat4 uMMatrix;
uniform mat4 uPMatrix;
uniform mat4 uCameraMatrix;

void main() {

  gl_Position = uPMatrix * uCameraMatrix * uMMatrix * vec4(aPosition.xyz, 1.0);
}
`;
