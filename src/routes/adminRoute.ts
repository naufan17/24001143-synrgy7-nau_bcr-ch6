import express, { Router } from 'express';
import AdminController from '../controllers/AdminController';
import AuthenticateMiddleware from '../middleware/AuthenticateMiddleware';
import AuthorizationMiddleware from '../middleware/AuthorizationMiddleware';

const router: Router = express.Router();

router.post('/admin/register', AuthenticateMiddleware.authenticate, AuthorizationMiddleware.authorizeSuperAdmin, AdminController.registerAdmin);
router.post('/admin/login', AdminController.loginAdmin);

export default router