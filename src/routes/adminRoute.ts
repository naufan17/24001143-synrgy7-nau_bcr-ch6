import express, { Router } from 'express';
import AdminController from '../controllers/AdminController';

const router: Router = express.Router();

router.post('/admin/register', AdminController.registerAdmin);
router.post('/admin/login', AdminController.loginAdmin);

export default router