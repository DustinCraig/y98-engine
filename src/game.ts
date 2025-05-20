import {glCanvas} from './engine/gl';

let playing = false;

async function lockMouseCursor() {
  if (glCanvas) {
    await glCanvas.requestPointerLock();
  }
}

export function startPlaying() {
  playing = true;
  if (glCanvas) {
    glCanvas.addEventListener('click', lockMouseCursor);
  }
}

export function stopPlaying() {
  playing = false;
  if (glCanvas) {
    glCanvas.removeEventListener('click', lockMouseCursor);
  }
}

export function isPlaying() {
  return playing;
}
