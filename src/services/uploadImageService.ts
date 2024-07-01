import cloudinary from '../config/cloudinary';
import { UploadApiResponse } from 'cloudinary';

interface CloudinaryUploadResult extends UploadApiResponse {
    url: string;
}

class UploadImageService {
    async uploadImage(fileImage: Express.Multer.File): Promise<CloudinaryUploadResult>{
        const result = await cloudinary.uploader.upload(fileImage.path, { 
            folder: 'car', 
            maxFileSize: 2097152 
        });

        return result;
    }
}

export default new UploadImageService();