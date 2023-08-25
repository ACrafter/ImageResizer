/* eslint-disable @typescript-eslint/no-misused-promises */
import Express from "express";
import path from "path";
import formidable from "formidable";
import { getImg } from "../controllers/jpeg";

const router = Express.Router();


// Home Route
router.get("/", (req, res) => {
  res.sendFile(path.resolve("Public/views/index.ejs"));
});

// Image Routes
  // Image Upload
router.post("/image", (req, res, next) => {
  let imgName:string;
  const form = formidable({
    uploadDir: path.join(__dirname, "..", "..", "Public", "Images", "uploaded"),
    keepExtensions: true,
    filename(name, ext, part, form) {
      imgName = `${name}${ext}`;
      return imgName
    },
  })


  form.parse(req, (err, fields, files) => {          
    if (err as unknown as boolean) {
      next(err);
    }
    res.redirect(`/image/${imgName}`)
  });
});

// Image Modify
router.get("/image/:ImgName", (req, res) => {
  const imgName = req.params.ImgName;
  res.render(path.resolve("Public/views/image.ejs"), {imgName})
});

// Image Preview
router.post("/preview/:ImgName", async (req, res, next) => {
  const form = formidable({})
  const imgName:string = req.params.ImgName.split(".")[0];
  const extension:string = req.params.ImgName.split(".")[1];
  let width:number;
  let height:number;

  form.parse(req, async (err, fields, files) => {          
    if (err as unknown as boolean) {
      next(err);
    }
    width = Number(fields.width)
    height = Number(fields.height)    

    try {
      await getImg(imgName, width, height, extension);
      const completeName = `${imgName}${width}${height}.${extension}`
      res.render(path.resolve("Public/views/preview.ejs"), {imgName: completeName, name: imgName, extension, width, height})
    } catch (err) {
      console.log(err);
      res.send("Error, Wrong Query Params");
    }
  });
})

// Image Download
router.post("/download/:ImgName", async (req, res, next) => {
  const imgName:string = req.params.ImgName.split(".")[0];
  const extension:string = req.params.ImgName.split(".")[1];
  const width:number = Number(req.query.width)
  const height:number = Number(req.query.height)

  try {
      await getImg(imgName, width, height, extension);
      res.download(path.join(
        __dirname,
        "..",
        "..",
        "Public",
        "Images",
        "processed",
        `${imgName}${width}${height}.${extension}`
      ))      
    } catch (err) {
      console.log(err);
      res.send("Error, Wrong Query Params");
    }
  });


// Modifying the image
router.get(
  "/image/jpg",
  async (req: Express.Request, res: Express.Response): Promise<void> => {
    if (Object.keys(req.query).length !== 0) {
      const name: string = req.query.name as unknown as string;
      const width: number = Number(req.query.width) as unknown as number;
      const height: number = Number(req.query.height) as unknown as number;
      try {
        // await getImg(name, width, height);
        const processedPath = path.join(
          __dirname,
          "..",
          "..",
          "frontend",
          "Images",
          "processed",
          name + String(width) + String(height) + ".jpg"
        );
        res.download(processedPath);
      } catch (err) {
        console.log(err);
        res.send("Error, Wrong Query Params");
      }
    } else {
      res.send("Error no queries found!");
    }
  }
);

export default router; 
