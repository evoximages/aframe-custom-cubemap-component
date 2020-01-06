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
    folder: { type: 'string', default: '' },
    edgeLength: { type: 'int', default: 500 },
    ext: { type: 'string', default: 'png' },
    transparent: { type: 'boolean', default: false },
    background: { type: 'boolean', default: false },
    formatRGBA: { type: 'boolean', default: false },
    stereo: { type: 'string', default: 'both' },
    eye: { type: 'string', default: '_L_' },
    vifnum: { type: 'string', default: '' },
    size: { type: 'string', default: '' }
  },

  init() {
    this.onEnterVr = this.onEnterVr.bind(this);
    this.onExitVr = this.onExitVr.bind(this);
    this.setStereoLayer = this.setStereoLayer.bind(this);
    this.isMobile();
  },

  update() {
    if (this.data.folder !== '') {
      const textures = this.loadCubemapTexture(this.data.folder);
      this.createSkyBox(textures);
    }
  },

  play() {
    this.addEventListeners();
  },

  remove() {
    this.removeEventListeners();
    this.el.removeObject3D('cubemap');
  },

  isMobile() {
    // if (!this.el.sceneEl.isMobile) {
    return this.el.sceneEl.setAttribute('vr-mode-ui', { enabled: false });
    // }
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
    const loader = new THREE.CubeTextureLoader();

    // url order matters for textureloader to place images on correct cube face
    const ext = this.data.ext;
    const urls = [
      `1.${ext}`,
      `3.${ext}`,
      `4.${ext}`,
      `5.${ext}`,
      `0.${ext}`,
      `2.${ext}`
    ];
    const path = folderPath || '';

    if (this.data.background) {
      return loader.setPath(path + '/').load(urls);
    }

    const formattedUrls = urls.map(
      url => `${folderPath}${this.data.eye}${url}`
    );
    return loader.setPath(path + '/').load(formattedUrls);
  },

  createSkyBox(textures) {
    const shader = THREE.ShaderLib.cube;

    // Create shader material
    const skyBoxMaterial = new THREE.ShaderMaterial({
      fragmentShader: shader.fragmentShader,
      vertexShader: shader.vertexShader,
      uniforms: shader.uniforms,
      depthWrite: false,
      side: THREE.BackSide,
      transparent: this.data.transparent
    });

    // Object.defineProperty(skyBoxMaterial, 'envMap', {
    //   get: function() {
    //     return this.uniforms.envMap.value;
    //   }
    // });

    // Apply cubemap textures to shader uniforms
    skyBoxMaterial.uniforms.envMap.value = textures;

    // Clone ShaderMaterial (necessary for multiple cubemaps)
    const skyBoxMaterialClone = skyBoxMaterial.clone();

    // Set skybox dimensions
    const size = this.data.edgeLength;
    const skyBoxGeometry = new THREE.CubeGeometry(size, size, size);

    const cubemap = new THREE.Mesh(skyBoxGeometry, skyBoxMaterialClone);

    // Set entity's object3D
    this.el.setObject3D('cubemap', cubemap);
    console.log(this.el.getObject3D('cubemap'));
  }
});
