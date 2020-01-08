// Cubemap Component
// FILENAMES must end in this format: 'AIL13803_pavr_L_2.png'
// The component appends a few params: ${eye}${side}${ext}
// `path` must end at the parent directory of the 6 individual images.

export const config = {
  path: 'your hosted image directory here'
  // sample path:
  //   'https://....cloudfront.net/interior_vr_gear/MY2020/AIL13803_2048/Interior/AIL13803_pavr/AIL13803_pavr'
  // Cubemap component will attempt to load these files: `${path}_L_0.png`, `${path}_L_1.png`, `${path}_L_2.png`, `${path}_L_3.png`, `${path}_L_4.png`, `${path}_L_5.png`
};
