import { config } from '../../../../config.js';

// Pano scene
function Pano(sceneManager) {
  const { path, eye, ext } = config;
  const scene = sceneManager.getScene();
  const urls = config['sides'].map(i => `${path}${eye}${i}${ext}`);

  // Add instance of Pano to scene renderer
  sceneManager.addEntityToScene(new Cubemap(scene, urls));
}

// Cubemap
function Cubemap(scene, urls) {
  const textures = new THREE.CubeTextureLoader().load(urls);
  textures.format = THREE.RGBAFormat;
  scene.background = textures;

  this.update = function(time) {};
}

export { Pano };
