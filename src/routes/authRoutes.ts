import express, { Router } from 'express';
import AuthController from '../controllers/AuthController';

const router: Router = express.Router();

router.get(
    '/validate-token', 
    AuthController.validateToken
);


export default router