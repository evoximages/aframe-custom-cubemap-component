import { config } from '../../../../config.js';
const { showroomInt, path, eye, ext } = config;

// Pano urls
function Pano(sceneManager) {
  const scene = sceneManager.getScene();
  // const roomUrls = config['sides'].map(i => `${showroomInt}${i}${ext}`);
  const carUrls = config['sides'].map(i => `${path}${eye}${i}${ext}`);

  sceneManager.addEntityToScene(new Cubemap(scene, carUrls, 'car'));
  // sceneManager.addEntityToScene(new Cubemap(scene, roomUrls, 'room'));
}

// Cubemap
function Cubemap(scene, urls, type) {
  // let textures, geometry, material;
  const textures = new THREE.CubeTextureLoader().load(urls);
  // const material = new THREE.MeshBasicMaterial({ envMap: urls });
  textures.format = THREE.RGBAFormat;
  scene.background = textures;

  function makeInstance(textures, geometry, color, x, y, z) {
    const options = {
      envMap: textures,
      color: color,
      side: THREE.BackSide,
      transparent: true
    };

    const material = new THREE.MeshBasicMaterial(options);
    const cube = new THREE.Mesh(geometry, material);

    cube.position.set(x, y, z);

    // scene.add(cube);

    return cube;
  }

  switch (type) {
    case 'room': {
      const textures = new THREE.CubeTextureLoader().load(urls);
      const geometry = new THREE.BoxBufferGeometry(5, 5, 5);
      makeInstance(textures, geometry, 'purple', 0, 0, 0);
      break;
    }
    case 'car': {
      const textures = new THREE.CubeTextureLoader().load(urls);
      const geometry = new THREE.BoxBufferGeometry(2, 2, 2);
      makeInstance(textures, geometry, 'white', 0, 0, 0);
      break;
    }
  }

  this.update = function(time) {};
}

export { Pano };
