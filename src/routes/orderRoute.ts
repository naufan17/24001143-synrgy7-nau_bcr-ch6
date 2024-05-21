import express, { Router } from 'express';
import OrderController from '../controllers/OrderController';

const router: Router = express.Router();

router.get('/order', OrderController.getOrder);
router.get('/order/:id', OrderController.getOrderById);
router.post('/order', OrderController.createOrder);
router.put('/order/:id', OrderController.updateOrder);
router.delete('/order/:id', OrderController.deleteOrder);

export default router