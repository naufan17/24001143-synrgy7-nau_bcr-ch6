import express, { Router } from 'express';
import UserController from '../controllers/UserController';

const router: Router = express.Router();

router.get('/user', UserController.getAllUser);
router.post('/user', UserController.createUser);
router.put('/user/:id', UserController.updateUser);
router.delete('/user/:id', UserController.deleteUser);

export default router