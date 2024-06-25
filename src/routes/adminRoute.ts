import express, { Router } from 'express';
import AdminController from '../controllers/AdminController';
import AuthenticateMiddleware from '../middleware/AuthenticateMiddleware';
import AuthorizationMiddleware from '../middleware/AuthorizationMiddleware';

const router: Router = express.Router();

router.get(
    '/admin', 
    AuthenticateMiddleware.authenticate, 
    AuthorizationMiddleware.authorizeAdmin, 
    AdminController.currentAdmin
);

router.post(
    '/admin/register', 
    AuthenticateMiddleware.authenticate, 
    AuthorizationMiddleware.authorizeSuperAdmin, 
    AdminController.registerAdmin
);

router.post(
    '/admin/login', 
    AdminController.loginAdmin
);

router.get(
    '/admin/user', 
    AuthenticateMiddleware.authenticate, 
    AuthorizationMiddleware.authorizeAdmin, 
    AdminController.getUser
);

router.get(
    '/admin/admin', 
    AuthenticateMiddleware.authenticate, 
    AuthorizationMiddleware.authorizeSuperAdmin, 
    AdminController.getAdmin
);

export default router