const jimp = require("jimp");

const imageResize = async (imageUri) => {
  const image = await jimp.read(imageUri);
  await image.resize(250, 250);
  await image.writeAsync(imageUri);
};

module.exports = imageResize;
