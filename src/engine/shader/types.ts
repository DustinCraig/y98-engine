import {
  POSITION_ATTRIBUTE_LOCATION,
  TEXTURE_ATTRIBUTE_LOCATION,
  POSITION_ATTRIBUTE_NAME,
  TEXTURE_ATTRIBUTE_NAME,
} from '../constants';

export type ShaderAttribute = {
  index: number;
  name: string;
};

export const SHADER_ATTRIBUTES: {[key: number]: ShaderAttribute} = {
  [POSITION_ATTRIBUTE_LOCATION]: {
    index: POSITION_ATTRIBUTE_LOCATION,
    name: POSITION_ATTRIBUTE_NAME,
  },
  [TEXTURE_ATTRIBUTE_LOCATION]: {
    index: TEXTURE_ATTRIBUTE_LOCATION,
    name: TEXTURE_ATTRIBUTE_NAME,
  },
};

export enum UNIFORM_LOCATIONS {
  RESOLUTION = 'uResolution',
  COLOR = 'uColor',
  MODEL_VIEW_MATRIX = 'uMVMatrix',
  PERSPECTIVE_MATRIX = 'uPMatrix',
  CAMERA_MATRIX = 'uCameraMatrix',
}
