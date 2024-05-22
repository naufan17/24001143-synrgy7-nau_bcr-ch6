import { Request, Response } from 'express';
import Controller from './Controller';
import bcrypt from 'bcryptjs';
import User from '../models/User';

class AuthController extends Controller {
    public loginUser = async (req: Request, res: Response) => {
        const { email, password } = req.body;
    
        try {
            const user = await User.query().findOne({ email });
            
            if (!user) {
                return this.handleNotFound(res, 'User not found');
            }
    
            const isPasswordValid = await bcrypt.compare(password, user.password);       
            if (!isPasswordValid) {
                return this.handleUnauthorized(res, 'Invalid password');
            }

            this.handleSuccess(res, 'Login successful')    
        } catch (err) {
            this.handleError(res, err, 'Login failed')
        }
    };    
}

export default new AuthController();