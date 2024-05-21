import express, { Router } from 'express';
import CarController from '../controllers/carController';
import imageController from '../controllers/imageController';
import { uploadImageCar } from '../config/multer';

const router: Router = express.Router();

router.get('/car', CarController.getCar);
router.get('/car/:id', CarController.getCarById);
router.post('/car', CarController.createCar);
router.post('/car/image', uploadImageCar.single('image'), imageController.uploadImageCar)
router.put('/car/:id', CarController.updateCar);
router.delete('/car/:id', CarController.deleteCar);

export default router