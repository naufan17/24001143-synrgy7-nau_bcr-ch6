import { Request, Response } from 'express';
import Controller from './Controller';
import AdminService from '../services/AdminService';

class AdminController extends Controller {    
    public currentAdmin = async (req: Request|any, res: Response) => {
        const admin = req.user;

        this.handleSuccess(res, admin)
    }

    public loginAdmin = async (req: Request, res: Response) => {
        const { username, password } = req.body;
    
        try {
            const token = await AdminService.loginAdmin(username, password);
            
            if (!token) {
                return this.handleNotFound(res, 'Admin not found');
            }

            this.handleSuccess(res, { token: token })    
        } catch (err) {
            this.handleError(res, err, 'Login failed')
        }
    };    

    public registerAdmin = async (req: Request, res: Response) => {
        const {
            username,
            password
        } = req.body;
    
        try {
            const admin = await AdminService.registerAdmin(
                username, 
                password
            )

            if (!admin) {
                return this.handleNotFound(res, 'Admin already registered');
            }
            
            this.handleCreated(res, 'Admin created successfully');
        } catch (err) {
            this.handleError(res, err, 'Failed to create admin');
        }
    };

}

export default new AdminController();