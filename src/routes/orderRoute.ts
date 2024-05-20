import express, { Router } from 'express';
import { getOrder, getOrderById, createOrder, updateOrder, deleteOrder } from '../service/orderService';

const router: Router = express.Router();

router.get('/order', getOrder);
router.get('/order/:id', getOrderById);
router.post('/order', createOrder);
router.put('/order/:id', updateOrder);
router.delete('/order/:id', deleteOrder);

export default router