import {mat4} from 'gl-matrix';
import {gl} from '../gl';
import {SHADER_ATTRIBUTES, UNIFORM_LOCATIONS} from './types';
import {staticWorldVertex, staticWorldFragment} from './defaultShaders';
import {POSITION_ATTRIBUTE_LOCATION} from '../constants';

/**
 * Bind all predefined attribute locations to the
 * current attached shader program. Note: this should be
 * done before the shader program is linked.
 * @param program Compiled and attached shader program
 * @returns
 */
function bindAttributeLocations(program: WebGLProgram) {
  // TODO: Throw error here?
  if (!gl) return;

  for (const [key, value] of Object.entries(SHADER_ATTRIBUTES)) {
    gl?.bindAttribLocation(program, value.index, value.name);
  }
}

function loadShader(type: number, source: string): WebGLShader | null {
  const shader = gl?.createShader(type);
  if (!shader) return null;

  gl?.shaderSource(shader, source);
  gl?.compileShader(shader);

  if (!gl?.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    // TODO: Logging
    gl?.deleteShader(shader);
    return null;
  }
  return shader;
}

function linkAndValidateProgram(program: WebGLProgram) {
  // TODO: Error handling?
  if (!gl) return;
  try {
    gl.linkProgram(program);

    // Check the LINK_STATUS and VALIDATE_STATUS parameters to make sure our
    // program was linked correctly

    if (!gl.getProgramParameter(program, gl.LINK_STATUS))
      throw new Error('Shader program could not be linked');

    gl.validateProgram(program);

    if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS))
      throw new Error('Shader program link status could not be validated');
  } catch (error) {
    // Fatal error!
    console.error(error);
    gl.deleteProgram(program);
    throw error;
  }
}

function createAndLinkShaderProgram(
  vertexShaderSource: string,
  fragmentShaderSource: string
): WebGLProgram | null {
  if (!gl) return null;

  const vertexShader = loadShader(gl.VERTEX_SHADER, vertexShaderSource);
  const fragmentShader = loadShader(gl.FRAGMENT_SHADER, fragmentShaderSource);

  if (!vertexShader || !fragmentShader) {
    return null;
  }

  const program = gl.createProgram();

  if (!program) {
    return null;
  }

  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);

  bindAttributeLocations(program);
  linkAndValidateProgram(program);

  gl.deleteShader(vertexShader);
  gl.deleteShader(fragmentShader);

  return program;
}

export class Shader {
  program: WebGLProgram | null | undefined;
  name: string;
  isInitialized: boolean;
  isActive: boolean;

  constructor() {
    // TODO: Should there be a default naming scheme here?
    this.name = '';
    this.isActive = false;
    this.isInitialized = false;
  }

  public initialize(
    vertexShaderSource: string,
    fragmentShaderSource: string,
    shaderName?: string | undefined
  ) {
    this.program = createAndLinkShaderProgram(
      vertexShaderSource,
      fragmentShaderSource
    );

    if (shaderName) this.name = shaderName;

    this.isInitialized = true;
  }

  public setPositionAttribute(
    size = 2,
    type = gl?.FLOAT as number,
    normalize = false,
    stride = 0,
    offset = 0
  ) {
    gl?.enableVertexAttribArray(POSITION_ATTRIBUTE_LOCATION);
    gl?.vertexAttribPointer(
      POSITION_ATTRIBUTE_LOCATION,
      size,
      type,
      normalize,
      stride,
      offset
    );
  }

  public activate() {
    // TODO: Logging
    if (!this.program) {
      throw new Error(
        `Shader: ${this.name ?? 'UNKNOWN'} could not be activated`
      );
    }
    gl?.useProgram(this.program);
    this.setPositionAttribute();
    this.isActive = true;
  }

  public deactivate() {
    gl?.useProgram(null);
    this.isActive = false;
  }

  public setModelMatrix(m: mat4, loc: UNIFORM_LOCATIONS) {
    if (!this.program) return;

    // TODO: Can you move this to the activate function?
    const modelMatrixLocation = gl.getUniformLocation(this.program, loc);

    gl?.uniformMatrix4fv(modelMatrixLocation, false, new Float32Array(m));
  }

  public setPerspectiveMatrix(m: mat4) {
    if (!this.program) return;

    const perspectiveMatrixLocation = gl.getUniformLocation(
      this.program,
      UNIFORM_LOCATIONS.PERSPECTIVE_MATRIX
    );

    gl?.uniformMatrix4fv(perspectiveMatrixLocation, false, new Float32Array(m));
  }
}

export const worldShader = new Shader();
export const spriteShader = new Shader();

export const initializeBasicShaders = () => {
  worldShader.initialize(staticWorldVertex, staticWorldFragment);
  // spriteShader.initialize(staticSpriteVertex, staticSpriteFragment);
};
