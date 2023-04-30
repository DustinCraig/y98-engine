export const MAIN_CANVAS_NAME = 'y98-MAIN';
export const REFRESH_RATE = 1000 / 60;
export const SETTINGS_KEY = 'y98-SETTINGS';

/* Shader */
export const POSITION_ATTRIBUTE_LOCATION = 0;
export const POSITION_ATTRIBUTE_NAME = 'aPos';
export const TEXTURE_ATTRIBUTE_LOCATION = 1;
export const TEXTURE_ATTRIBUTE_NAME = 'aTex';

/* Entity */
export enum ENTITY_TYPE {
  PLANE,
  CUBE,
}

/* Camera */
export const FOV = 45;
export const NEAR = 0.1;
export const FAR = 10000;

/* Actions */
export const MOVE_FORWARD = 'MOVE_FORWARD';
export const MOVE_LEFT = 'MOVE_LEFT';
export const MOVE_RIGHT = 'MOVE_RIGHT';
export const MOVE_BACKWARD = 'MOVE_BACKWARD';
