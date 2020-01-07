import { Cubemap } from './Cubemap.js';

function renderCar(data, sceneManager) {
  const sides = ['1', '3', '4', '5', '0', '2'];
  let urls = sides.map(side => buildCarUrl(data, side));

  let scene = sceneManager.getScene();
  sceneManager.addEntityToScene(new Cubemap(scene, urls));
}

function buildCarUrl(data, i) {
  const { path, eye, ext } = data;
  return `${path}${eye}${i}${ext}`;
}

export { renderCar };
