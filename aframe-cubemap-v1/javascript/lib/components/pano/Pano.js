import { config } from '../../../../config.js';

// Pano scene
function Pano(sceneManager) {
  const { path } = config;
  const eye = '_L_';
  const sides = ['1', '3', '4', '5', '0', '2'];
  const ext = '.png';

  const urls = sides.map(i => `${path}${eye}${i}${ext}`);

  // Add instance of Pano to scene renderer
  const scene = sceneManager.getScene();
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
