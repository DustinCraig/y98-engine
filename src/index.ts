import {glInstanceWrapper} from './engine/gl';
import {startRendering} from './engine/renderer';
import {MAIN_CANVAS_NAME} from './engine/constants';
import {managers} from './engine/managers';
import {EntityManager} from './engine/managers/entityManager';

window.addEventListener('resize', () => {
  const canvas = <HTMLCanvasElement | null>(
    document.getElementById(MAIN_CANVAS_NAME)
  );
  if (!canvas) return;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  glInstanceWrapper.resize(canvas.width, canvas.height);
});

managers.entityManager = new EntityManager();

startRendering();
