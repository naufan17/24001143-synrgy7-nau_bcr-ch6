import { Request, Response } from 'express';
import uploadImageService  from '../services/uploadImageService';

class imageController {
    async uploadImageCar(req: Request, res: Response){
        const fileImage = req.file;

        if (!fileImage) {
            return res.status(400).json({ error: 'No image uploaded' });
        }
    
        try {
            const result = await uploadImageService.uploadImage(fileImage);
            res.status(200).json({ url: result.secure_url });
        } catch (err) {
            console.log(err);
            res.status(500).json({ error: 'Error uploading image' })
        }
    }
    
}

export default new imageController();