import sharp from "sharp"
import fs from 'node:fs'
import path from 'path'


const processImg = async (name: string, width: number, height: number): Promise<number | string> => {
    let img;
    let data;
    let fullPath: string = path.join(__dirname, '..', '..', 'Images', 'full', name + '.jpg')
    let processedPath: string = path.join(__dirname, '..', '..', 'Images', 'processed', name + String(width) + String(height) + '.jpg')
    let imgExist = fs.existsSync(fullPath)
    if (imgExist) {
        img = await sharp(fullPath);
        data = await img.metadata();
    } else {
        return -1
    }

    if (data.width == width && data.height == height) {
        return 0
    } else {
        await img
            .resize({
                width: width,
                height: height
            }).toFile(processedPath)
        return 0
    }
}

const getImg = async (name: string, width: number, height: number): Promise<number> => {
    let processedPath: string = path.join(__dirname, '..', '..', 'Images', 'processed', name + String(width) + String(height) + '.jpg')
    let imgExist = fs.existsSync(processedPath)
    if (imgExist) {
        return 0
    } else {
        await processImg(name, width, height)
        return -1
    }
}

export { processImg, getImg };