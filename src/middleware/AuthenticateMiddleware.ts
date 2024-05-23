import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';
import Middleware from './Middleware'

class AuthenticateMiddleware extends Middleware {
    public authenticate = (req: Request|any, res: Response, next: NextFunction) => {
        const token = req.header('Authorization')?.split(' ')[1];
        
        if (!token) {
            return this.handleUnauthorized(res);
        }
    
        try {
            const decoded = verifyToken(token);
            req.user = decoded;

            next();
        } catch (err) {
            return this.handleForbidden(res, 'Invalid token');
        }
    };    
}

export default new AuthenticateMiddleware();