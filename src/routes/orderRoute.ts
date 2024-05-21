import express, { Router } from 'express';
import orderController from '../controllers/orderController';

const router: Router = express.Router();

router.get('/order', orderController.getOrder);
router.get('/order/:id', orderController.getOrderById);
router.post('/order', orderController.createOrder);
router.put('/order/:id', orderController.updateOrder);
router.delete('/order/:id', orderController.deleteOrder);

export default router