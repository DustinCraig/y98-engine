export const MAIN_CANVAS_NAME = 'y98-MAIN';
export const REFRESH_RATE = 1000 / 60;
export const SETTINGS_KEY = 'y98-SETTINGS';

/* Shader */
export const POSITION_ATTRIBUTE_LOCATION = 0;
export const POSITION_ATTRIBUTE_NAME = 'aPosition';
export const TEXTURE_ATTRIBUTE_LOCATION = 1;
export const TEXTURE_ATTRIBUTE_NAME = 'aTex';

/* Entity */
export enum ENTITY_TYPE {
  PLANE,
  CUBE,
}

/* Camera */
export const NEAR = 0.1;
export const FAR = 10000;
export const FOV = 45;

/* Settings */
export const SETTINGS = {
  // Movement
  MOVE_FORWARD: 'MOVE_FORWARD',
  MOVE_LEFT: 'MOVE_LEFT',
  MOVE_RIGHT: 'MOVE_RIGHT',
  MOVE_BACKWARD: 'MOVE_BACKWARD',
  MOUSE_MOVE: 'MOUSE_MOVE',

  // Camera
  MOUSE_SPEED: 0.003,
};
