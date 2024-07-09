import { Response } from 'express';
import Controller from './Controller';
import { AdminOrUserRequest } from '../interfaces/AuthRequest';
import { verifyToken } from '../utils/jwt';
import { Admin } from '../interfaces/Admin';
import { User } from '../interfaces/User';

class AuthController extends Controller {    
    public validateToken = async (req: AdminOrUserRequest | any, res: Response): Promise<void> => {
        const token: string | undefined = req.header('Authorization')?.split(' ')[1];
        
        if (!token) {
            return this.handleUnauthorized(res);
        }
    
        try {
            const decoded = verifyToken(token) as Admin | User;

            this.handleSuccess(res, { admin : decoded }, "Token is valid")
        } catch (err) {
            this.handleForbidden(res, 'Invalid token');
        }
    }
}

export default new AuthController();