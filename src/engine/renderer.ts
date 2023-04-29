import {gl, glInstanceWrapper} from './gl';
import {ENTITY_TYPE, REFRESH_RATE} from './constants';
import {initializeBasicShaders, worldShader} from './shader';
import {Entity} from './entity';
import {Camera} from './camera';
import {vec3} from 'gl-matrix';
import {managers} from './managers';

let rendering = false;
let entity: any;
let entity2: any;
let entity3: any;
const camera = new Camera();

export function startRendering() {
  rendering = true;
  initializeBasicShaders();

  entity = new Entity(ENTITY_TYPE.CUBE);
  entity2 = new Entity(ENTITY_TYPE.CUBE);
  entity3 = new Entity(ENTITY_TYPE.CUBE);

  entity2.position = vec3.fromValues(0, 2, -10);
  entity3.position = vec3.fromValues(5, 2, -10);
}

export function stopRendering() {
  rendering = false;
}

function renderWorld() {
  worldShader.activate();

  const colorUniformLocation = gl?.getUniformLocation(
    worldShader.program as WebGLProgram,
    'uColor'
  );

  gl?.uniform4f(
    colorUniformLocation as number,
    Math.random(),
    Math.random(),
    Math.random(),
    1
  );

  camera.initialize();
  camera.render();

  managers.entityManager.objects.forEach((value, key) => {
    value.render();
  });
}

function render() {
  glInstanceWrapper.clear();

  renderWorld();
}

function gameLoop() {
  if (rendering) render();
  window.setTimeout(gameLoop, REFRESH_RATE);
}

gameLoop();
