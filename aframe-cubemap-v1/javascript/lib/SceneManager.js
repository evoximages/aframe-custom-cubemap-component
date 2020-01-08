function SceneManager(canvas) {
  const clock = new THREE.Clock();

  const screenDimensions = {
    width: canvas.width,
    height: canvas.height
  };

  const scene = buildScene();
  const renderer = buildRenderer(screenDimensions);
  const camera = buildCamera(screenDimensions);
  const sceneEntities = createSceneEntities(scene);
  const controls = buildControls(camera, canvas);

  function buildScene() {
    const scene = new THREE.Scene();

    return scene;
  }

  function buildRenderer({ width, height }) {
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
      alpha: true
    });
    const DPR = window.devicePixelRatio ? window.devicePixelRatio : 1;
    renderer.setPixelRatio(DPR);
    renderer.setSize(width, height);
    renderer.gammaInput = true;
    renderer.gammaOutput = true;

    return renderer;
  }

  function buildCamera({ width, height }) {
    const aspectRatio = width / height;
    const fieldOfView = 65;
    const nearPlane = 0.1;
    const farPlane = 1000;
    const camera = new THREE.PerspectiveCamera(
      fieldOfView,
      aspectRatio,
      nearPlane,
      farPlane
    );

    return camera;
  }

  function createSceneEntities(scene) {
    const sceneEntities = [];

    return sceneEntities;
  }

  function buildControls(camera) {
    return new THREE.OrbitControls(camera, renderer.domElement);
  }

  this.updateControls = function(type) {
    // if interior, need to rotate to flip top/bottom images
    if (type === 'pano') controls.target.set(0, 0, 1);
    if (type === 'spin') controls.target.set(0, 0, 0);

    controls.update();
  };

  this.getScene = function() {
    return scene;
  };

  this.addEntityToScene = function(entity) {
    sceneEntities.push(entity);
  };

  this.removeEntityFromScene = function(entity) {
    let index = sceneEntities.indexOf(entity);
    if (index > -1) sceneEntities.splice(index, 1);
  };

  this.update = function() {
    const elapsedTime = clock.getElapsedTime();

    for (let i = 0; i < sceneEntities.length; i++) {
      sceneEntities[i].update(elapsedTime);
    }
    renderer.render(scene, camera);
  };

  this.onWindowResize = function() {
    // const { width, height } = canvas;
    const width = window.innerWidth;
    const height = window.innerHeight;

    screenDimensions.width = width;
    screenDimensions.height = height;

    renderer.setSize(width, height);

    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  };
}

export { SceneManager };
