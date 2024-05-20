import { Request, Response } from 'express';
import cloudinary from '../config/cloudinary';

const uploadImageCar = async (req: Request, res: Response) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    try {
        const result = await cloudinary.uploader.upload(req.file.path, { 
            folder: 'car', 
            maxFileSize: 2097152 
        });

        res.status(200).json({ url: result.secure_url });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Error uploading image' })
    }
}

export default  uploadImageCar;