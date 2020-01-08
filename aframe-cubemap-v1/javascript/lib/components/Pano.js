// Pano Component
// FILENAMES must end in this format: 'AIL13803_pavr_L_2.png'
// The component appends a few params: ${eye}${side}${ext}

// sample path:
//   'https://....cloudfront.net/interior_vr_gear/MY2020/AIL13803_2048/Interior/AIL13803_pavr/AIL13803_pavr'
// Pano component will attempt to load these files: `${path}_L_0.png`, `${path}_L_1.png`, `${path}_L_2.png`, `${path}_L_3.png`, `${path}_L_4.png`, `${path}_L_5.png`

function Pano(sceneManager) {
  const path = document.querySelector('#scene-pano').dataset.path;
  const eye = '_L_';
  const ext = '.png';
  const sides = ['1', '3', '4', '5', '0', '2'];
  const urls = sides.map(side => `${path}${eye}${side}${ext}`);

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
