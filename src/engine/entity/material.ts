import {vec4} from 'gl-matrix';

export class Material {
  _color: vec4;

  constructor() {
    this._color = vec4.fromValues(0, 190, 190, 1);
  }

  get color() {
    return this._color;
  }

  set color(c: vec4) {
    this._color = c;
  }
}
