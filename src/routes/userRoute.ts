import express, { Router } from 'express';
import UserController from '../controllers/UserController';
import AuthenticateMiddleware from '../middleware/AuthenticateMiddleware';

const router: Router = express.Router();

router.get(
    '/user', 
    AuthenticateMiddleware.authenticate, 
    UserController.currentUser
);

router.post(
    '/user/register', 
    UserController.registerUser
);

router.post(
    '/user/login', 
    UserController.loginUser
);

export default router