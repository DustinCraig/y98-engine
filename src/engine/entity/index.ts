import {gl} from '../gl';
import {vec3} from 'gl-matrix';
import {Transform} from './transform';
import {ENTITY_TYPE, POSITION_ATTRIBUTE_LOCATION} from '../constants';
import {CUBE, ObjectData} from './objectData';
import {worldShader} from '../shader';
import {UNIFORM_LOCATIONS, SHADER_ATTRIBUTES} from '../shader/types';
import {v4 as uuid} from 'uuid';
import {managers, ManagedObject} from '../managers';
import {Material} from './material';

export class Entity extends ManagedObject {
  material: Material;

  _name: string;
  _transform: Transform;
  _type: ENTITY_TYPE;
  _objectData: ObjectData;
  _vao: WebGLVertexArrayObject | undefined;
  _id: string;
  // TODO: Replace color with texture?

  constructor(type: ENTITY_TYPE) {
    super();
    this._name = '';
    this._transform = new Transform();
    this.material = new Material();
    this._type = type;
    this._objectData = {vertices: [], normals: [], indices: []};
    this._vao = undefined;
    this._id = uuid();
    managers.entityManager?.add(this);
  }

  initialize() {
    this.buildObjectFromType();
    this.buildVAO();
  }

  set position(vec: vec3) {
    this._transform.position = vec;
  }

  get position() {
    return this._transform.position;
  }

  set scale(vec: vec3) {
    this._transform.scale = vec;
  }

  get scale() {
    return this._transform.scale;
  }

  set rotation(vec: vec3) {
    this._transform.rotation = vec;
  }

  buildObjectFromType() {
    switch (this._type) {
      case ENTITY_TYPE.CUBE: {
        this._objectData = JSON.parse(JSON.stringify(CUBE));
        return;
      }
    }
  }

  buildVAO() {
    if (!this._objectData) throw new Error('Entity is missing objectData');
    const vao = gl.createVertexArray(); //vaoExtension?.createVertexArrayOES();
    if (!vao) {
      throw new Error('VAO could not be created');
    }

    gl.bindVertexArray(vao);

    const vertexBuffer = gl.createBuffer();
    const indexBuffer = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array(this._objectData.vertices),
      gl.STATIC_DRAW
    );

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(
      gl.ELEMENT_ARRAY_BUFFER,
      new Uint16Array(this._objectData.indices),
      gl.STATIC_DRAW
    );

    this._vao = vao;

    gl.bindVertexArray(null);
  }

  render() {
    if (!this._vao) return;

    this._transform.updateMatrix();
    worldShader.setModelMatrix(
      this._transform._modelMatrix,
      UNIFORM_LOCATIONS.MODEL_MATRIX
    );
    if (worldShader.program) {
      const posLocation = gl.getAttribLocation(
        worldShader.program,
        SHADER_ATTRIBUTES[POSITION_ATTRIBUTE_LOCATION].name
      );
      gl.vertexAttribPointer(posLocation, 3, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(posLocation);
    }

    worldShader.setColor(this.material.color);

    gl.bindVertexArray(this._vao);
    gl.drawElements(
      gl.TRIANGLES,
      this._objectData.indices.length,
      gl.UNSIGNED_SHORT,
      0
    );
  }
}
