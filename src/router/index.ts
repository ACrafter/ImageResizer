import Express from "express";
import path from 'path';
import { getImg } from "../controllers/jpeg";


const router = Express.Router();

router.get('/jpg', async (req: Express.Request, res: Express.Response): Promise<void> => {
    let name: string = (req.query.name as unknown) as string;
    let width: number = (Number(req.query.width) as unknown) as number;
    let height: number = (Number(req.query.height) as unknown) as number;
    await getImg(name, width, height);
    let processedPath: string = path.join(__dirname, '..', '..', 'Images', 'processed', name + String(width) + String(height) + '.jpg')
    res.sendFile(processedPath)
})

export default router;