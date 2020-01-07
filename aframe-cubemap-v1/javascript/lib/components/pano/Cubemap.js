function Cubemap(scene, textures) {
  const cubeTexture = new THREE.CubeTextureLoader().load(textures);
  const material = new THREE.MeshBasicMaterial({ envMap: textures });
  const geometry = new THREE.BoxBufferGeometry(5, 5, 5);
  // const mesh = new THREE.Mesh(geometry, material);
  // scene.add(mesh);

  cubeTexture.format = THREE.RGBAFormat;
  scene.background = cubeTexture;

  function makeInstance(geometry, color) {
    const material = new THREE.MeshBasicMaterial({
      color: color,
      envMap: cubeTexture,
      side: THREE.BackSide
    });

    const cube = new THREE.Mesh(geometry, material);

    return cube;
  }

  const cube = makeInstance(geometry, '#ffffff');

  // scene.add(cube);

  this.update = function(time) {};
}

export { Cubemap };
