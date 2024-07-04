import express, { Router } from 'express';
import authRoute from './authRoutes';
import adminRoute from './adminRoute';
import userRoute from './userRoute';
import carRoute from './carRoute';
import orderRoute from './orderRoute';

const router: Router = express.Router();

router.use(authRoute);
router.use(adminRoute);
router.use(userRoute);
router.use(carRoute);
router.use(orderRoute);

export default router;