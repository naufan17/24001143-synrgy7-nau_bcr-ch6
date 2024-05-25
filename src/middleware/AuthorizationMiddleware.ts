import { Request, Response, NextFunction } from 'express';
import Middleware from './Middleware';

class AuthorizationMiddleware extends Middleware {
    public authorizeAdmin = (req: Request|any, res: Response, next: NextFunction) => {
        const admin = req.admin;

        if (!admin.super_admin) {
            return this.handleUnauthorized(res);
        }

        next();
    }

    public authorizeSuperAdmin = (req: Request|any, res: Response, next: NextFunction) => {
        const admin = req.admin;

        if (admin.super_admin === false) {
            return this.handleUnauthorized(res);
        }

        next();
    }
}

export default new AuthorizationMiddleware();