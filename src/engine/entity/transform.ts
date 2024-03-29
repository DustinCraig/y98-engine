import {vec3, vec4, mat4} from 'gl-matrix';
import {transformVec4, degToRad} from '../../math';

export class Transform {
  _position: vec3;
  _scale: vec3;
  _rotation: vec3;
  _up: vec4;
  _right: vec4;
  _forward: vec4;
  _modelMatrix: mat4;

  constructor() {
    this._position = vec3.create();
    vec3.set(this._position, 0, -2, -10);
    this._scale = vec3.create();
    vec3.set(this._scale, 1, 1, 1);
    this._rotation = vec3.create();
    this._up = vec4.create();
    this._right = vec4.create();
    this._forward = vec4.create();
    this._modelMatrix = mat4.create();
  }

  resetViewMatrix() {
    this._modelMatrix = mat4.create();
    return this._modelMatrix;
  }

  updateEyeMatrix() {
    mat4.identity(this._modelMatrix);
    mat4.rotateX(
      this._modelMatrix,
      this._modelMatrix,
      degToRad(this._rotation[0])
    );
    mat4.rotateY(
      this._modelMatrix,
      this._modelMatrix,
      degToRad(this._rotation[1])
    );
    mat4.rotateZ(
      this._modelMatrix,
      this._modelMatrix,
      degToRad(this._rotation[2])
    );
    mat4.translate(this._modelMatrix, this._modelMatrix, this._position);
  }

  updateMatrix() {
    mat4.identity(this._modelMatrix);

    mat4.translate(this._modelMatrix, this._modelMatrix, this._position);
    mat4.rotateX(
      this._modelMatrix,
      this._modelMatrix,
      degToRad(this._rotation[0])
    );
    mat4.rotateY(
      this._modelMatrix,
      this._modelMatrix,
      degToRad(this._rotation[1])
    );
    mat4.rotateZ(
      this._modelMatrix,
      this._modelMatrix,
      degToRad(this._rotation[2])
    );
    mat4.scale(this._modelMatrix, this._modelMatrix, this._scale);

    // transformVec4(this._forward, [0, 0, 1, 0], this._modelMatrix);
    // transformVec4(this._up, [0, 1, 0, 0], this._modelMatrix);
    // transformVec4(this._right, [1, 0, 0, 0], this._modelMatrix);
  }

  rotateX(deg: number) {
    vec3.set(
      this._rotation,
      this._rotation[0] + deg,
      this._rotation[1],
      this._rotation[2]
    );
  }

  get position() {
    return this._position;
  }

  set position(pos: vec3) {
    this._position = pos;
  }

  get scale() {
    return this._scale;
  }

  set scale(vec: vec3) {
    this._scale = vec;
  }

  get rotation() {
    return this._rotation;
  }

  set rotation(vec: vec3) {
    this._rotation = vec;
  }

  get up() {
    return this._up;
  }

  set up(vec: vec4) {
    this._up = vec;
  }

  get right() {
    return this._right;
  }

  set right(vec: vec4) {
    this._right = vec;
  }

  get forward() {
    return this._forward;
  }

  set forward(vec: vec4) {
    this._forward = vec;
  }

  get viewMatrix() {
    return this._modelMatrix;
  }

  set viewMatrix(m: mat4) {
    this._modelMatrix = m;
  }
}
