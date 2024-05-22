import { Request, Response } from 'express';
import Controller from './Controller'
import UploadImageService  from '../services/UploadImageService';

class ImageController extends Controller {
    public uploadImageCar = async (req: Request, res: Response) => {
        const fileImage = req.file;

        if (!fileImage) {
            return this.handleBadRequest(res, 'No image uploaded');
        }
    
        try {
            const result = await UploadImageService.uploadImage(fileImage);
            this.handleSuccess(res, { url: result.secure_url });
        } catch (err) {
            this.handleError(res, err, 'Error uploading image')
        }
    }
    
}

export default new ImageController();