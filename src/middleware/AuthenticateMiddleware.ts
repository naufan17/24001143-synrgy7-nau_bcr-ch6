import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';
import Middleware from './Middleware'

class AuthenticateMiddleware extends Middleware {
    public authenticate = (req: Request | any, res: Response, next: NextFunction): void => {
        const token: string | undefined = req.header('Authorization')?.split(' ')[1];
        
        if (!token) {
            return this.handleUnauthorized(res);
        }
    
        try {
            const decoded: any = verifyToken(token);

            if(decoded.super_admin !== undefined) {
                req.admin = decoded;
                next();
            } else {
                req.user = decoded;
                next();
            }
        } catch (err) {
            this.handleForbidden(res, 'Invalid token');
        }
    };    

    public passAuthenticateUser = (req: Request | any, res: Response, next: NextFunction): void => {
        const token: string | undefined = req.header('Authorization')?.split(' ')[1];
        
        if (!token) {
            return next();
        }
    
        try {
            const decoded: any = verifyToken(token);
            req.user = decoded;
            next();
        } catch (err) {
            this.handleForbidden(res, 'Invalid token');
        }
    };    


    public passAuthenticateAdmin = (req: Request|any, res: Response, next: NextFunction): void => {
        const token: string | undefined = req.header('Authorization')?.split(' ')[1];
        
        if (!token) {
            return next();
        }
    
        try {
            const decoded: any = verifyToken(token);

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