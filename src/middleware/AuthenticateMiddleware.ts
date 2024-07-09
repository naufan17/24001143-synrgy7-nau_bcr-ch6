import { Response, NextFunction } from 'express';
import Middleware from './Middleware'
import { verifyToken } from '../utils/jwt';
import { AdminOrUserRequest } from '../interfaces/AuthRequest';
import { Admin } from '../interfaces/Admin';
import { User } from '../interfaces/User';

class AuthenticateMiddleware extends Middleware {
    public authenticate = (req: AdminOrUserRequest | any, res: Response, next: NextFunction): void => {
        const token: string | undefined = req.header('Authorization')?.split(' ')[1];
        
        if (!token) {
            return this.handleUnauthorized(res);
        }
    
        try {
            const decoded = verifyToken(token) as Admin | User;

            if('super_admin' in decoded) {
                req.admin = decoded as Admin;
                next();
            } else {
                req.user = decoded as User;
                next();
            }

        } catch (err) {
            this.handleForbidden(res, 'Invalid token');
        }
    };    

    public passAuthenticateUser = (req: AdminOrUserRequest | any, res: Response, next: NextFunction): void => {
        const token: string | undefined = req.header('Authorization')?.split(' ')[1];
        
        if (!token) {
            return next();
        }
    
        try {
            const decoded = verifyToken(token) as User;
            req.user = decoded;
            next();
        } catch (err) {
            this.handleForbidden(res, 'Invalid token');
        }
    };    

    public passAuthenticateAdmin = (req: AdminOrUserRequest | any, res: Response, next: NextFunction): void => {
        const token: string | undefined = req.header('Authorization')?.split(' ')[1];
        
        if (!token) {
            return next();
        }
    
        try {
            const decoded = verifyToken(token) as Admin;

            if(decoded.super_admin !== undefined) {
                req.admin = decoded;
                return next();
            }

            next();
        } catch (err) {
            this.handleForbidden(res, 'Invalid token');
        }
    };    
}

export default new AuthenticateMiddleware();