import {managers, ManagedObject} from '../managers';
import {Transform} from '../entity/transform';
import {vec3} from 'gl-matrix';
import {v4 as uuid} from 'uuid';
import {Camera} from '../camera';
import {Settings} from '../../settings';
import {MOVE_BACKWARD, MOVE_FORWARD, MOVE_LEFT, MOVE_RIGHT} from '../constants';

export class Player extends ManagedObject {
  _name: string;
  _transform: Transform;
  _id: string;
  _camera: Camera;
  _direction: vec3;
  _pitch: number;
  _yaw: number;

  constructor(name: string) {
    super();
    this._name = name;
    this._transform = new Transform();
    this._id = uuid();
    this._camera = new Camera();
    this._direction = vec3.create();
    this._pitch = 0;
    this._yaw = 0;
    this.addWindowEventListener('load', () => {
      setTimeout(() => {
        this.initialize();
      }, 200);
    });
    this.addWindowEventListener('resize', () => {
      this.initialize();
    });
    this.addDocumentEventListener('keydown', e => {
      this.keyDown(e);
    });
    this.addDocumentEventListener('keyup', e => {
      this.keyUp(e);
    });
    this.addDocumentEventListener('mousemove', e => {
      this.mouseMove(e);
    });
    managers.playerManager.add(this);
  }

  initialize() {
    this._camera.initialize();
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

  keyDown(event: KeyboardEvent) {
    const {key} = event;
    const settings = Settings.getSettings();
    switch (key) {
      case settings[MOVE_FORWARD]: {
        this._direction[2] = 1;
        return;
      }
      case settings[MOVE_LEFT]: {
        this._direction[0] = 1;
        return;
      }
      case settings[MOVE_RIGHT]: {
        this._direction[0] = -1;
        return;
      }
      case settings[MOVE_BACKWARD]: {
        this._direction[2] = -1;
      }
    }
  }

  keyUp(event: KeyboardEvent) {
    const {key} = event;
    const settings = Settings.getSettings();
    switch (key) {
      case settings[MOVE_BACKWARD]:
      case settings[MOVE_FORWARD]: {
        this._direction[2] = 0;
        return;
      }
      case settings[MOVE_LEFT]:
      case settings[MOVE_RIGHT]: {
        this._direction[0] = 0;
        return;
      }
    }
  }

  mouseMove(event: MouseEvent) {

  }

  render() {
    this.position[0] = this.position[0] + 1 * this._direction[0];
    this.position[2] = this.position[2] + 1 * this._direction[2];
    this._camera.position = vec3.fromValues(
      this.position[0],
      this.position[1] + 2,
      this.position[2]
    );
    this._camera.render();
  }
}
