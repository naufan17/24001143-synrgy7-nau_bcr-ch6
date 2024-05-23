import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';
import AdminRepository from "../repositories/AdminRepository";
import { generateToken } from '../utils/jwt';

class AdminService {
    async loginAdmin(
        username: string, 
        password: string
    ){
        const admin =  await AdminRepository.findByUsername(username);
        return admin

        // if (!admin) {
        //     return null;
        // }

        // const validPassword = await bcrypt.compare(password, admin.password);

        // if(validPassword) {
        //     const token = generateToken({ id: admin.id, username: admin.username, super_admin: admin.roles.super_admin });

        //     return token;
        // } else {
        //     return null;
        // }
    }

    async registerAdmin(
        username: string,
        password: string
    ){
        const id = uuidv4();
        const admin =  await AdminRepository.findByUsername(username);

        if (admin) {
            return false;
        }

        return await AdminRepository.create(
            id,
            username, 
            password
        );
    }
}

export default new AdminService();