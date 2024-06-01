import express, { Router } from 'express';
import userRoute from './userRoute';
import adminRoute from './adminRoute';
import carRoute from './carRoute';
import orderRoute from './orderRoute';

const router: Router = express.Router();

router.use(adminRoute);
router.use(userRoute);
router.use(carRoute);
router.use(orderRoute);

export default router;