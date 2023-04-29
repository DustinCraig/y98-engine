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

  initialize() {
    this.updatePerspectiveMatrix();
    // vec3.set(this._transform.position, 0, 0, -26);
  }

  render() {
    this._transform.updateMatrix();
    // TODO: update camera modelview matrix
    worldShader.setPerspectiveMatrix(this.perspectiveMatrix);
    // worldShader.setModelMatrix(
    //   this._transform._viewMatrix,
    //   UNIFORM_LOCATIONS.CAMERA_MATRIX
    // );
  }
}
