/* global AFRAME, THREE */
if (typeof AFRAME === 'undefined') {
  throw new Error(
    'Component attempted to register before AFRAME was available.'
  );
}

/**
 * Custom Cubemap component for A-Frame.
 */
AFRAME.registerComponent('custom-cubemap', {
  multiple: true,
  schema: {
    folder: {
      type: 'string',
      default: ''
    },
    edgeLength: {
      type: 'int',
      default: 500
    },
    ext: {
      type: 'string',
      default: 'png'
    },
    transparent: {
      type: 'boolean',
      default: false
    },
    formatRGBA: {
      type: 'boolean',
      default: false
    },
    stereo: {
      type: 'string',
      default: 'both'
    },
    eye: {
      type: 'string',
      default: '_L_'
    },
    vif: {
      type: 'string',
      default: ''
    }
  },

  init() {
    this.onEnterVr = this.onEnterVr.bind(this);
    this.onExitVr = this.onExitVr.bind(this);
    this.setStereoLayer = this.setStereoLayer.bind(this);
  },

  update() {
    if (this.data.folder !== '') {
      cubemap = this.loadCubemapTexture(this.data.folder);
      return this.createSkyBox(cubemap);
    }
  },

  play() {
    this.addEventListeners();
  },

  remove() {
    this.removeEventListeners();
    this.el.removeObject3D('cubemap');
  },

  onEnterVr() {
    this.setStereoLayer('inVrMode');
  },

  onExitVr() {
    this.setStereoLayer('outVrMode');
  },

  addEventListeners() {
    const canvasEl = document.querySelector('a-scene');
    if (canvasEl) {
      canvasEl.addEventListener('enter-vr', this.onEnterVr, false);
      canvasEl.addEventListener('exit-vr', this.onExitVr, false);
    }
  },

  removeEventListeners() {
    const canvasEl = document.querySelector('a-scene');
    if (canvasEl) {
      canvasEl.removeEventListener('enter-vr', this.onEnterVr);
      canvasEl.removeEventListener('exit-vr', this.onExitVr);
    }
  },

  setStereoLayer(mode) {
    const data = this.data;
    const obj3D = this.el.object3D.children[0];

    if (data.stereo === 'both' || data.stereo === 'left') {
      obj3D.layers.set(0);
    } else if (data.stereo === 'right') {
      obj3D.layers.set(2);
    }

    if (mode === 'inVrMode' && data.stereo === 'left') {
      obj3D.layers.set(1);
    }
  },

  loadCubemapTexture(folderPath) {
    const eye = this.data.eye;
    const loader = new THREE.CubeTextureLoader();
    // url order matters for textureloader to place images on correct cube face
    const urls = ['1.png', '3.png', '4.png', '5.png', '0.png', '2.png'];
    const path = folderPath || '';
    const formattedUrls = urls.map(url => `${folderPath}${eye}${url}`);
    return loader.setPath(path + '/').load(formattedUrls);
  },

  createSkyBox(cubemap) {
    const shader = THREE.ShaderLib.cube;

    // Create shader material
    const skyBoxShader = new THREE.ShaderMaterial({
      fragmentShader: shader.fragmentShader,
      vertexShader: shader.vertexShader,
      transparent: this.data.transparent,
      uniforms: shader.uniforms,
      side: THREE.BackSide,
      depthWrite: false
    });

    // Clone ShaderMaterial (necessary for multiple cubemaps)
    const skyBoxMaterial = skyBoxShader.clone();

    // Apply cubemap textures to shader uniforms
    skyBoxMaterial.uniforms.tCube.value = cubemap;

    // Set skybox dimensions
    const edgeLength = this.data.edgeLength;
    const skyBoxGeometry = new THREE.CubeGeometry(
      edgeLength,
      edgeLength,
      edgeLength
    );

    // Set entity's object3D
    this.el.setObject3D(
      'cubemap',
      new THREE.Mesh(skyBoxGeometry, skyBoxMaterial)
    );
  }
});
