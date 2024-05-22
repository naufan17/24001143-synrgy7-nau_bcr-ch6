import express, { Router } from 'express';
import UserController from '../controllers/UserController';

const router: Router = express.Router();

router.post('/user/register', UserController.registerUser);
router.post('/user/login', UserController.loginUser);

export default router