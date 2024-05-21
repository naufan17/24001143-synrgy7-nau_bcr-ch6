import express, { Router } from 'express';
import AuthenticationController from '../controllers/AuthenticationController';

const router: Router = express.Router();

router.post('/login', AuthenticationController.loginUser);

export default router