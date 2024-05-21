import cloudinary from '../config/cloudinary';

class uploadImageService {
    async uploadImage(fileImage: any){
        return await cloudinary.uploader.upload(fileImage.path, { 
            folder: 'car', 
            maxFileSize: 2097152 
        });
    }
}

export default new uploadImageService();