import {glInstanceWrapper} from './engine/gl';
import {startRendering} from './engine/renderer';
import {MAIN_CANVAS_NAME} from './engine/constants';
import {managers} from './engine/managers';
import {EntityManager} from './engine/managers/entityManager';
import {PlayerManager} from './engine/managers/playerManager';
import {Settings} from './settings';
import {startPlaying} from './game';

window.addEventListener('resize', () => {
  const canvas = <HTMLCanvasElement | null>(
    document.getElementById(MAIN_CANVAS_NAME)
  );
  if (!canvas) return;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  glInstanceWrapper.resize(canvas.width, canvas.height);
});

managers.playerManager = new PlayerManager();
managers.entityManager = new EntityManager();

Settings.initialize();

startRendering();
startPlaying();
