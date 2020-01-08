import { SceneManager } from './SceneManager.js';
import { Pano } from './components/Pano.js';

let canvas, sceneManager, container;

init();
bindEventListeners();
render();

function createScene(type) {
  container = document.querySelector(`#scene-${type}`);
  canvas = document.createElement('canvas');
  container.appendChild(canvas);
  sceneManager = new SceneManager(canvas);
  renderComponent(type, sceneManager);
}

function bindEventListeners() {
  window.onresize = resizeCanvas;
}

function render() {
  sceneManager.update();
  requestAnimationFrame(render);
}

function resizeCanvas() {
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetWidth / 1.8;
  sceneManager.onWindowResize();
}

function renderComponent(type) {
  Pano(sceneManager);
  sceneManager.updateControls(type);
}

function init() {
  createScene('pano');
  resizeCanvas();
}
