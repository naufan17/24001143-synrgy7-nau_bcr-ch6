import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';
import User from '../models/User';

class UserController {
    async getAllUser(req: Request, res: Response) {
        try {
            const users = await User.query();
    
            if (!users || users.length === 0) {
                return res.status(404).json({ message: 'User not found' });
            }
    
            const formattedUser = users.map((car: any) => ({
                id: car.id,
                name: car.name,
                email: car.email,
                address: car.address,
                phone_number: car.phone_number,
                created_at: car.created_at,
                updated_at: car.updated_at,
            }));
    
            res.status(200).json({ users: formattedUser })
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to fetch user' });
        }
    }
    
    async createUser(req: Request, res: Response) {
        const {
            name,
            email,
            address,
            phone_number,
            password,
        } = req.body;
        const user_id = uuidv4();
    
        try {
            await User.query().insert({
                id: user_id,
                name,
                email,
                address,
                phone_number,
                password: await bcrypt.hash(password, 10),
            });
            
            res.status(201).json({ message: 'User created successfully' });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to create user' });
        }
    };
    
    async updateUser(req: Request, res: Response) {
        const id: string = req.params.id;
        const {
            name,
            email,
            address,
            phone_number,
            password,
        } = req.body;
    
        try {
            await User.query().findById(id).update({
                name,
                email,
                address,
                phone_number,
                password: await bcrypt.hash(password, 10),
            });
            
            res.status(201).json({ message: 'User updated successfully' });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to update user' });
        }
    }
    
    async deleteUser(req: Request, res: Response) {
        const id: string = req.params.id;
    
        try {
            const rowsDeleted = await User.query().deleteById(id);
    
            if (rowsDeleted === 0) {
                res.status(404).json({ message: 'User not found' });
                return
            }
      
            res.status(201).json({ message: 'User deleted successfully' })
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to delete user' });
        }
    }
}

export default new UserController();