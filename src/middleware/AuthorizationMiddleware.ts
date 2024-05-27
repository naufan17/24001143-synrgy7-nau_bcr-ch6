import { Request, Response, NextFunction } from 'express';
import Middleware from './Middleware';

class AuthorizationMiddleware extends Middleware {
    public authorizeAdmin = (req: Request|any, res: Response, next: NextFunction) => {
        const admin = req.admin

        if (admin) {
            if (admin.super_admin === true || admin.super_admin === false) {
                next();
            } else {
                return this.handleUnauthorized(res);
            }
        } else {
            return this.handleUnauthorized(res);
        }
    }

    public authorizeSuperAdmin = (req: Request|any, res: Response, next: NextFunction) => {
        const admin = req.admin

        if (admin) {
            if (admin.super_admin === true) {
                next();
            } else {
                return this.handleUnauthorized(res);
            }
        } else {
            return this.handleUnauthorized(res);
        }
    }

    public authorizeUser = (req: Request|any, res: Response, next: NextFunction) => {
        const user = req.user

        if (user) {
            next();
        } else {
            return this.handleUnauthorized(res);
        }
    }
}

export default new AuthorizationMiddleware();