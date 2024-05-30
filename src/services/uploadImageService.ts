import cloudinary from '../config/cloudinary';

class UploadImageService {
    async uploadImage(fileImage: Express.Multer.File): Promise<any>{
        const result = await cloudinary.uploader.upload(fileImage.path, { 
            folder: 'car', 
            maxFileSize: 2097152 
        });

        return result;
    }
}

export default new UploadImageService();