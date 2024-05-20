import express, { Router } from 'express';
import { loginUser } from '../controllers/AuthenticationController';

const router: Router = express.Router();

router.post('/login', loginUser);

export default router