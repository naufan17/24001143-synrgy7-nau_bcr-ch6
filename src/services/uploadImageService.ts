import cloudinary from '../config/cloudinary';

class UploadImageService {
    async uploadImage(fileImage: any){
        return await cloudinary.uploader.upload(fileImage.path, { 
            folder: 'car', 
            maxFileSize: 2097152 
        });
    }
}

export default new UploadImageService();