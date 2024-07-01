import { Request, Response } from 'express';
import Controller from './Controller';
import AdminService from '../services/AdminService';
import { AdminRequest } from '../interfaces/AuthRequest';

class AdminController extends Controller {    
    public currentAdmin = async (req: AdminRequest, res: Response): Promise<void> => {
        const admin = req.admin;

        if(!admin) {
            return this.handleUnauthorized(res);
        }

        this.handleSuccess(res, admin)
    }

    public getAdmin = async (req: Request, res: Response): Promise<void> => {
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

    public getUser = async (req: Request, res: Response): Promise<void> => {
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

    public loginAdmin = async (req: Request, res: Response): Promise<void> => {
        const { username, password } = req.body;
    
        try {
            const token = await AdminService.loginAdmin(username, password);
            
            if (!token) {
                return this.handleNotFound(res, 'Username and password not valid');
            }

            this.handleSuccess(res, { token })    
        } catch (err) {
            this.handleError(res, err, 'Failed to login admin')
        }
    };    

    public registerAdmin = async (req: Request, res: Response): Promise<void> => {
        const { username, password } = req.body;
    
        try {
            const admin = await AdminService.registerAdmin(username, password);

            if (!admin) {
                return this.handleNotFound(res, 'Admin already registered');
            }
            
            this.handleCreated(res, 'Admin created successfully');
        } catch (err) {
            this.handleError(res, err, 'Failed to register admin');
        }
    };
}

export default new AdminController();