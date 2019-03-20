!function(e){var t={};function r(n){if(t[n])return t[n].exports;var a=t[n]={i:n,l:!1,exports:{}};return e[n].call(a.exports,a,a.exports,r),a.l=!0,a.exports}r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)r.d(n,a,function(t){return e[t]}.bind(null,a));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=0)}([function(e,t){function r(e,t,r,n,a,o,i){try{var u=e[o](i),s=u.value}catch(e){return void r(e)}u.done?t(s):Promise.resolve(s).then(n,a)}if("undefined"==typeof AFRAME)throw new Error("Component attempted to register before AFRAME was available.");AFRAME.registerComponent("custom-cubemap",{multiple:!0,schema:{folder:{type:"string",default:""},edgeLength:{type:"int",default:500},ext:{type:"string",default:"png"},transparent:{type:"boolean",default:!1},background:{type:"boolean",default:!1},formatRGBA:{type:"boolean",default:!1},stereo:{type:"string",default:"both"},eye:{type:"string",default:"_L_"},vifnum:{type:"string",default:""},key:{type:"string",default:""}},init:function(){this.onEnterVr=this.onEnterVr.bind(this),this.onExitVr=this.onExitVr.bind(this),this.setStereoLayer=this.setStereoLayer.bind(this)},update:function(){var e=this;(""!==this.data.folder&&(cubemap=this.loadCubemapTexture(this.data.folder),this.createSkyBox(cubemap)),""!==this.data.key)&&this.fetchData(this.data.key).then(function(t){cubemap=e.loadCubemapTexture("",e.formatFetchUrls(t)),e.createSkyBox(cubemap)})},play:function(){this.addEventListeners()},remove:function(){this.removeEventListeners(),this.el.removeObject3D("cubemap")},onEnterVr:function(){this.setStereoLayer("inVrMode")},onExitVr:function(){this.setStereoLayer("outVrMode")},addEventListeners:function(){var e=document.querySelector("a-scene");e&&(e.addEventListener("enter-vr",this.onEnterVr,!1),e.addEventListener("exit-vr",this.onExitVr,!1))},removeEventListeners:function(){var e=document.querySelector("a-scene");e&&(e.removeEventListener("enter-vr",this.onEnterVr),e.removeEventListener("exit-vr",this.onExitVr))},setStereoLayer:function(e){var t=this.data,r=this.el.object3D.children[0];"both"===t.stereo||"left"===t.stereo?r.layers.set(0):"right"===t.stereo&&r.layers.set(2),"inVrMode"===e&&"left"===t.stereo&&r.layers.set(1)},loadCubemapTexture:function(e,t){var r=this,n=new THREE.CubeTextureLoader,a=["1.png","3.png","4.png","5.png","0.png","2.png"],o=e||"";if(this.data.background)return n.setPath(o+"/").load(a);if(this.data.key)return n.load(t);var i=a.map(function(t){return"".concat(e).concat(r.data.eye).concat(t)});return n.setPath(o+"/").load(i)},createSkyBox:function(e){var t=THREE.ShaderLib.cube,r=new THREE.ShaderMaterial({fragmentShader:t.fragmentShader,vertexShader:t.vertexShader,transparent:this.data.transparent,uniforms:t.uniforms,side:THREE.BackSide,depthWrite:!1}).clone();r.uniforms.tCube.value=e;var n=this.data.edgeLength,a=new THREE.CubeGeometry(n,n,n);this.el.setObject3D("cubemap",new THREE.Mesh(a,r))},formatFetchUrls:function(e){var t=this,r="https://cors-anywhere.herokuapp.com/",n=e.urls.filter(function(e){return RegExp(t.data.eye).test(e)}).sort();return[r+n[1],r+n[3],r+n[4],r+n[5],r+n[0],r+n[2]]},fetchData:function(){var e,t=(e=regeneratorRuntime.mark(function e(t){var r,n;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return r={eye:this.data.eye,vifnum:this.data.vifnum,apiKey:"?api_key="+t,product:"/products/14/134",base:"http://vehicles-api-dev.us-west-2.elasticbeanstalk.com/api/v1/vehicles/"},n=r.base+r.vifnum+r.product+r.apiKey+"&eye="+r.eye,e.next=4,fetch(n).then(function(e){return e.json()}).catch(function(e){console.log(e)});case 4:return e.abrupt("return",e.sent);case 5:case"end":return e.stop()}},e,this)}),function(){var t=this,n=arguments;return new Promise(function(a,o){var i=e.apply(t,n);function u(e){r(i,a,o,u,s,"next",e)}function s(e){r(i,a,o,u,s,"throw",e)}u(void 0)})});return function(e){return t.apply(this,arguments)}}()})}]);