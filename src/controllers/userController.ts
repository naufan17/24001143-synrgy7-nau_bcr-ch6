import { Request, Response } from 'express';
import Controller from './Controller';
import UserService from '../services/UserService';

class UserController extends Controller {    
    public loginUser = async (req: Request, res: Response) => {
        const { email, password } = req.body;
    
        try {
            const token = await UserService.loginUser(email, password);
            
            if (!token) {
                return this.handleNotFound(res, 'User not found');
            }

            this.handleSuccess(res, { token: token })    
        } catch (err) {
            this.handleError(res, err, 'Login failed')
        }
    };    

    public registerUser = async (req: Request, res: Response) => {
        const {
            name,
            email,
            address,
            phone_number,
            password
        } = req.body;
    
        try {
            const user = await UserService.registerUser(
                name, 
                email, 
                address, 
                phone_number, 
                password
            )

            if (!user) {
                return this.handleNotFound(res, 'User already registered');
            }
            
            this.handleCreated(res, 'User created successfully');
        } catch (err) {
            this.handleError(res, err, 'Failed to create user');
        }
    };

}

export default new UserController();