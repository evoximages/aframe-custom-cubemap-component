import { Cubemap } from './Cubemap.js';
import { config } from '../../../../config.js';

function renderPano(type, sceneManager) {
  const { showroomInt, sides, ext } = config;

  let urls = config['sides'].map(side => buildTextureUrl(config, side));
  let scene = sceneManager.getScene();

  sceneManager.addEntityToScene(new Cubemap(scene, urls));
}

function buildTextureUrl(config, i) {
  let { showroomInt, ext } = config;
  return `${showroomInt}${i}${ext}`;
}

function buildPanoUrl(data, i) {
  const { vifnum, year } = data;

  return `${cloudFrontUrl}interior_vr_gear/MY${year}/AIL${vifnum}_2048/Interior/AIL${vifnum}_pavr/AIL${vifnum}_pavr_L_${i}.png`;
}

export { renderPano };
