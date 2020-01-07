import { Cubemap } from './Cubemap.js';
import { config } from '../../../../config.js';

function renderPano(sceneManager) {
  const showroomTextures = config['sides'].map(side => buildShowroomUrls(side));
  const carTextures = config['sides'].map(side => buildCarUrls(side));

  const scene = sceneManager.getScene();
  sceneManager.addEntityToScene(new Cubemap(scene, carTextures));
  // sceneManager.addEntityToScene(new Cubemap(scene, showroomTextures));
}

function buildShowroomUrls(i) {
  const { showroomInt, ext } = config;
  return `${showroomInt}${i}${ext}`;
}

function buildCarUrls(i) {
  const { path, eye, ext } = config;
  return `${path}${eye}${i}${ext}`;
}

export { renderPano };
