import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';
import UserRepository from "../repositories/UserRepository";
import { generateToken } from '../utils/jwt';

class UserService {
    async loginUser(email: string, password: string): Promise<string | null>{
        const user =  await UserRepository.findByEmail(email);

        if (!user) {
            return null;
        }

        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return null;
        }

        const token = generateToken({ 
            id: user.id, 
            email: user.email 
        });

        return token;
    }

    async registerUser(
        name: string,
        email: string,
        address: string,
        phone_number: string,
        password: string
    ): Promise<void | null> {
        const id = uuidv4();
        const user =  await UserRepository.findByEmail(email);

        if (user) {
            return null;
        }

        return await UserRepository.create(
            id, 
            name, 
            email, 
            address, 
            phone_number, 
            password
        );
    }
}

export default new UserService();