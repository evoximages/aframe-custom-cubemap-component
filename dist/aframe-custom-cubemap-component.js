/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

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
    background: {
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
    vifnum: {
      type: 'string',
      default: ''
    },
    key: {
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
      this.createSkyBox(cubemap);
    }
    if (this.data.key !== '') {
      let response = this.fetchData(this.data.key);
      response.then(data => {
        cubemap = this.loadCubemapTexture('', this.formatFetchUrls(data));
        this.createSkyBox(cubemap);
      });
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

  loadCubemapTexture(folderPath, fetchedUrls) {
    const loader = new THREE.CubeTextureLoader();
    // url order matters for textureloader to place images on correct cube face
    const urls = ['1.png', '3.png', '4.png', '5.png', '0.png', '2.png'];
    const path = folderPath || '';

    if (this.data.background) {
      return loader.setPath(path + '/').load(urls);
    }

    if (this.data.key) {
      return loader.load(fetchedUrls);
    }

    const formattedUrls = urls.map(
      url => `${folderPath}${this.data.eye}${url}`
    );
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
  },

  formatFetchUrls(jsonData) {
    let proxy = 'https://cors-anywhere.herokuapp.com/';

    let filteredArray = jsonData.urls
      .filter(url => RegExp(this.data.eye).test(url))
      .sort();

    // THREE.js loader array img order
    let imgUrls = [
      proxy + filteredArray[1], // right
      proxy + filteredArray[3], // left
      proxy + filteredArray[4], // top
      proxy + filteredArray[5], // bottom
      proxy + filteredArray[0], // front
      proxy + filteredArray[2] // back
    ];
    return imgUrls;
  },

  async fetchData(key) {
    let opt = {
      eye: this.data.eye,
      vifnum: this.data.vifnum,
      apiKey: '?api_key=' + key,
      product: '/products/14/134',
      base:
        'http://vehicles-api-dev.us-west-2.elasticbeanstalk.com/api/v1/vehicles/'
    };

    const fetchUrl =
      opt.base + opt.vifnum + opt.product + opt.apiKey + '&eye=' + opt.eye;

    return await fetch(fetchUrl)
      .then(response => response.json())
      .catch(function(error) {
        console.log(error);
      });
  }
});


/***/ })
/******/ ]);