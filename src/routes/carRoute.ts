import express, { Router } from 'express';
import CarController from '../controllers/CarController';
import imageController from '../controllers/ImageController';
import { uploadImageCar } from '../config/multer';
import AuthenticateMiddleware from '../middleware/AuthenticateMiddleware';
import AuthorizationMiddleware from '../middleware/AuthorizationMiddleware';

const router: Router = express.Router();

router.get(
    '/car', 
    AuthenticateMiddleware.passAuthenticateAdmin, 
    CarController.getCar
);

router.get(
    '/car/:id', 
    AuthenticateMiddleware.passAuthenticateAdmin, 
    CarController.getCarById
);

router.post(
    '/car', 
    AuthenticateMiddleware.authenticate, 
    AuthorizationMiddleware.authorizeAdmin, 
    CarController.createCar
);

router.post(
    '/car/image', 
    AuthenticateMiddleware.authenticate, 
    AuthorizationMiddleware.authorizeAdmin, 
    uploadImageCar.single('image'), 
    imageController.uploadImageCar
);

router.put(
    '/car/:id', 
    AuthenticateMiddleware.authenticate, 
    AuthorizationMiddleware.authorizeAdmin, 
    CarController.updateCar);

    router.delete(
    '/car/:id', 
    AuthenticateMiddleware.authenticate, 
    AuthorizationMiddleware.authorizeAdmin, 
    CarController.deleteCar
);

export default router