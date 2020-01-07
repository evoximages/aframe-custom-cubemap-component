import { SceneManager } from './SceneManager.js';
import { renderPano } from '../lib/components/pano/renderPano.js';
import { renderCar } from '../lib/components/pano/renderCar.js';
import { config } from '../../config.js';
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

function renderComponent(type, sceneManager) {
  // renderPano(type, sceneManager);
  renderCar(config, sceneManager);
  sceneManager.updateControls(type);
}

function init() {
  createScene('pano');
  resizeCanvas();
}