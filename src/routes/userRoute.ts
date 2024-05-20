import express, { Router } from 'express';
import { getAllUser, createUser, updateUser, deleteUser } from '../controllers/userController';

const router: Router = express.Router();

router.get('/user', getAllUser);
router.post('/user', createUser);
router.put('/user/:id', updateUser);
router.delete('/user/:id', deleteUser);

export default router