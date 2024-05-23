import express, { Router } from 'express';
import OrderController from '../controllers/OrderController';
import AuthenticateMiddleware from '../middleware/AuthenticateMiddleware';
import AuthorizationMiddleware from '../middleware/AuthorizationMiddleware';

const router: Router = express.Router();

router.get('/order', AuthenticateMiddleware.authenticate, OrderController.getOrder);
router.get('/order/:id', AuthenticateMiddleware.authenticate, OrderController.getOrderById);
router.post('/order', AuthenticateMiddleware.authenticate, OrderController.createOrder);
router.put('/order/:id', AuthenticateMiddleware.authenticate, OrderController.updateOrder);
router.delete('/order/:id', AuthenticateMiddleware.authenticate, AuthorizationMiddleware.authorizeAdmin, OrderController.deleteOrder);

export default router