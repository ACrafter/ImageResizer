import sharp from "sharp";
import fs from "node:fs";
import path from "path";

const processImg = async (
  name: string,
  width: number,
  height: number,
  ext: string
): Promise<number | string> => {
  console.log(typeof(width));
  let img;
  let data;
  const fullPath: string = path.join(
    __dirname,
    "..",
    "..",
    "Public",
    "Images",
    "uploaded",
    `${name}.${ext}`
  );
  const processedPath: string = path.join(
    __dirname,
    "..",
    "..",
    "Public",
    "Images",
    "processed",
    `${name}${String(width)}${String(height)}.${ext}`
  );

  const imgExist = fs.existsSync(fullPath);
  if (imgExist) {
    img = sharp(fullPath);
    data = await img.metadata();
  } else {
    return -1;
  }

  if (data.width === width && data.height === height) {
    return 0;
  } else {
    await img
      .resize({
        width,
        height,
      })
      .toFile(processedPath);
    return 0;
  }
};

const getImg = async (
  name: string,
  width: number,
  height: number,
  ext: string
): Promise<void> => {
  const processedPath: string = path.join(
    __dirname,
    "..",
    "..",
    "Public",
    "Images",
    "processed",
    `${name}${String(width)}${String(height)}.${ext}`
  );
  const imgExist = fs.existsSync(processedPath);
  if (!imgExist) {
    await processImg(name, width, height, ext);
  }
};

export { processImg, getImg };
