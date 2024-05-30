import multer,  { Multer }  from 'multer'; 

export const uploadImageCar: Multer = multer({ 
    dest: 'public/images/car'
});