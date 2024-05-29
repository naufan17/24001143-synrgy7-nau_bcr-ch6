import { Request, Response } from 'express';
import Controller from './Controller';
import AdminService from '../services/AdminService';

class AdminController extends Controller {    
    public currentAdmin = async (req: Request|any, res: Response) => {
        const admin = req.admin;

        if(!admin) {
            return this.handleUnauthorized(res);
        }

        this.handleSuccess(res, admin)
    }

    public getAdmin = async (req: Request, res: Response) => {
        try {
            const admins = await AdminService.getAllAdmin();

            if (!admins || admins.length === 0) {
                return this.handleNotFound(res, 'Admin not found');
            }

            this.handleSuccess(res, { admins: admins });
        } catch (err) {
            this.handleError(res, err, 'Failed to fetch admin')
        }
    }

    public getUser = async (req: Request, res: Response) => {
        try {
            const users = await AdminService.getAllUser();

            if (!users || users.length === 0) {
                return this.handleNotFound(res, 'User not found');
            }

            this.handleSuccess(res, { users: users });
        } catch (err) {
            this.handleError(res, err, 'Failed to fetch user')
        }
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

            if (admin === null) {
                return this.handleNotFound(res, 'Admin already registered');
            }
            
            this.handleCreated(res, 'Admin created successfully');
        } catch (err) {
            this.handleError(res, err, 'Failed to create admin');
        }
    };
}

export default new AdminController();