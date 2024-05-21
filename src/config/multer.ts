import multer from 'multer'; 

export const uploadImageCar = multer({ 
    dest: 'public/images/car'
});