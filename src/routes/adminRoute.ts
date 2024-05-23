import express, { Router } from 'express';
import AdminController from '../controllers/AdminController';
import AuthenticateMiddleware from '../middleware/AuthenticateMiddleware';

const router: Router = express.Router();

router.post('/admin/register',AuthenticateMiddleware.authenticate, AdminController.registerAdmin);
router.post('/admin/login', AdminController.loginAdmin);

export default router