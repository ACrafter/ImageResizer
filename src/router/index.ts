/* eslint-disable @typescript-eslint/no-misused-promises */
import Express from "express";
import path from "path";
import { getImg } from "../controllers/jpeg";

const router = Express.Router();

router.get("/", (req, res) => {
  res.send("Go to /jpg");
});

router.get(
  "/jpg",
  async (req: Express.Request, res: Express.Response): Promise<void> => {
    if (Object.keys(req.query).length !== 0) {
      const name: string = req.query.name as unknown as string;
      const width: number = Number(req.query.width) as unknown as number;
      const height: number = Number(req.query.height) as unknown as number;
      try {
        await getImg(name, width, height);
        const processedPath: string = path.join(
          __dirname,
          "..",
          "..",
          "Images",
          "processed",
          name + String(width) + String(height) + ".jpg"
        );
        res.sendFile(processedPath);
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
