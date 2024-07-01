import { Request, Response } from 'express';
import Controller from './Controller';
import UserService from '../services/UserService';
import { UserRequest } from '../interfaces/AuthRequest';

class UserController extends Controller {
    public currentUser = async (req: UserRequest, res: Response): Promise<void> => {
        const user = req.user;

        if(!user) {
            return this.handleUnauthorized(res);
        }

        this.handleSuccess(res, user);
    }

    public loginUser = async (req: Request, res: Response): Promise<void> => {
        const { email, password } = req.body;
    
        try {
            const token = await UserService.loginUser(email, password);
            
            if (!token) {
                return this.handleNotFound(res, 'User not found');
            }

            this.handleSuccess(res, { token })    
        } catch (err) {
            this.handleError(res, err, 'Login failed')
        }
    } 

    public registerUser = async (req: Request, res: Response): Promise<void> => {
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
            this.handleError(res, err, 'Failed to register user');
        }
    };
}

export default new UserController();