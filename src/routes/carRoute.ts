import express, { Router } from 'express';
import CarController from '../controllers/CarController';
import imageController from '../controllers/ImageController';
import { uploadImageCar } from '../config/multer';
import AuthenticateMiddleware from '../middleware/AuthenticateMiddleware';

const router: Router = express.Router();

router.get('/car', CarController.getCar);
router.get('/car/:id', CarController.getCarById);
router.post('/car', AuthenticateMiddleware.authenticate, CarController.createCar);
router.post('/car/image', AuthenticateMiddleware.authenticate, uploadImageCar.single('image'), imageController.uploadImageCar)
router.put('/car/:id', AuthenticateMiddleware.authenticate, CarController.updateCar);
router.delete('/car/:id', AuthenticateMiddleware.authenticate, CarController.deleteCar);

export default router