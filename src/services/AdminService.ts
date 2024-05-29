import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';
import AdminRepository from "../repositories/AdminRepository";
import UserRepository from "../repositories/UserRepository";
import { generateToken } from '../utils/jwt';

class AdminService {
    async getAllAdmin() {
        const admins = await AdminRepository.findAll();

        if(!admins) {
            return null;
        }

        const formattedAdmin = admins.map((admin: any) => ({
            id: admin.id,
            username: admin.username,
            super_admin: admin.super_admin,
            created_at: admin.created_at,
            updated_at: admin.updated_at,
        }))

        return formattedAdmin;
    }

    async getAllUser() {
        const users = await UserRepository.findAll();

        if(!users) {
            return null;
        }

        const formattedUser = users.map((user: any) => ({
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

    async loginAdmin(
        username: string, 
        password: string
    ){
        const admin =  await AdminRepository.findByUsername(username);

        if (!admin) {
            return null;
        }

        const validPassword = await bcrypt.compare(password, admin.password);

        if(validPassword) {
            const token = generateToken({ 
                id: admin.id, 
                username: admin.username, 
                super_admin: admin.super_admin 
            });

            return token;
        } else {
            return null;
        }
    }

    async registerAdmin(
        username: string,
        password: string
    ){
        const id = uuidv4();
        const admin =  await AdminRepository.findByUsername(username);

        if (admin) {
            return null;
        }

        return await AdminRepository.create(
            id,
            username, 
            password
        );
    }
}

export default new AdminService();