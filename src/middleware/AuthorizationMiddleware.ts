import { Response, NextFunction } from 'express';
import Middleware from './Middleware';
import { AdminRequest, UserRequest } from '../interfaces/AuthRequest';

class AuthorizationMiddleware extends Middleware {
    public authorizeAdmin = (req: AdminRequest, res: Response, next: NextFunction): void => {
        const admin = req.admin

        if (admin && (admin.super_admin === true || admin.super_admin === false)) {
            next();
        } else {
            return this.handleUnauthorized(res);
        }
    }

    public authorizeSuperAdmin = (req: AdminRequest, res: Response, next: NextFunction): void => {
        const admin = req.admin

        if (admin && admin.super_admin === true) {
            next();
        } else {
            return this.handleUnauthorized(res);
        }
    }

    public authorizeUser = (req: UserRequest, res: Response, next: NextFunction): void => {
        const user = req.user

        if (user) {
            next();
        } else {
            return this.handleUnauthorized(res);
        }
    }
}

export default new AuthorizationMiddleware();