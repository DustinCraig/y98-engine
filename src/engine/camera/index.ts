import {mat4, vec3} from 'gl-matrix';
import {FOV, NEAR, FAR} from '../constants';
import {Transform} from '../entity/transform';
import {glInstanceWrapper} from '../gl';
import {worldShader} from '../shader';
import {UNIFORM_LOCATIONS} from '../shader/types';

export class Camera {
  public perspectiveMatrix: mat4;
  public _transform: Transform;

  constructor() {
    this.perspectiveMatrix = mat4.create();
    this._transform = new Transform();
  }

  updatePerspectiveMatrix() {
    // TODO: Hook this up to resize events?
    mat4.perspective(
      this.perspectiveMatrix,
      FOV,
      glInstanceWrapper.width / glInstanceWrapper.height,
      NEAR,
      FAR
    );
  }

  set position(vec: vec3) {
    this._transform.position = vec;
  }

  get position() {
    return this._transform.position;
  }

  set rotation(vec: vec3) {
    this._transform.rotation = vec;
  }

  get rotation() {
    return this._transform.rotation;
  }

  initialize() {
    this.updatePerspectiveMatrix();
  }

  render() {
    this._transform.updateMatrix();
    worldShader.setPerspectiveMatrix(this.perspectiveMatrix);
    worldShader.setModelMatrix(
      this._transform._viewMatrix,
      UNIFORM_LOCATIONS.CAMERA_MATRIX
    );
  }
}
