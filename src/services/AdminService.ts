import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';
import AdminRepository from "../repositories/AdminRepository";
import UserRepository from "../repositories/UserRepository";
import { generateToken } from '../utils/jwt';
import { FormattedAdmin } from '../interfaces/Admin';
import { FormattedUser } from '../interfaces/User';

class AdminService {
    async getAllAdmin(): Promise<FormattedAdmin[] | null>  {
        const admins = await AdminRepository.findAll();

        if (!admins) {
            return null;
        }

        const formattedAdmin: FormattedAdmin[] = admins.map((admin) => ({
            id: admin.id,
            username: admin.username,
            super_admin: admin.super_admin,
            created_at: admin.created_at,
            updated_at: admin.updated_at,
        }))

        return formattedAdmin;
    }

    async getAllUser(): Promise<FormattedUser[] | null>  {
        const users = await UserRepository.findAll();

        if (!users) {
            return null;
        }

        const formattedUser: FormattedUser[] = users.map((user) => ({
            id: user.id,
            name: user.name,
            email: user.email,
            address: user.address,
            phone_number: user.phone_number,
            created_at: user.created_at,
            updated_at: user.updated_at,
        }))

        return formattedUser;
    }

    async loginAdmin(username: string, password: string): Promise<string | null>{
        const admin =  await AdminRepository.findByUsername(username);

        if (!admin) {
            return null;
        }

        const validPassword = await bcrypt.compare(password, admin.password);

        if (!validPassword) {
            return null;
        }

        const token = generateToken({ 
            id: admin.id, 
            username: admin.username, 
            super_admin: admin.super_admin 
        });

        return token;
    }

    async registerAdmin(username: string, password: string): Promise<void | null>{
        const id: string = uuidv4();
        const admin =  await AdminRepository.findByUsername(username);

        if (admin) {
            return null;
        }

        password = await bcrypt.hash(password, 10);

        return await AdminRepository.create(
            id,
            username, 
            password
        );
    }
}

export default new AdminService();