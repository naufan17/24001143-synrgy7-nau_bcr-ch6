import express, { Router } from 'express';
import multer from 'multer'; 
import { getCar, getCarById, createCar, updateCar, deleteCar } from '../service/carService';
import uploadImageCar from '../service/imageService';

const router: Router = express.Router();
const uploadImage = multer({ dest: 'public/images/car' });

router.get('/car', getCar);
router.get('/car/:id', getCarById);
router.post('/car', createCar);
router.post('/car/image', uploadImage.single('image'), uploadImageCar)
router.put('/car/:id', updateCar);
router.delete('/car/:id', deleteCar);

export default router