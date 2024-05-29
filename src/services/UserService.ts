import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';
import UserRepository from "../repositories/UserRepository";
import { generateToken } from '../utils/jwt';

class UserService {
    async loginUser(
        email: string, 
        password: string
    ){
        const user =  await UserRepository.findByEmail(email);

        if (!user) {
            return null;
        }

        const validPassword = await bcrypt.compare(password, user.password);

        if(validPassword) {
            const token = generateToken({ 
                id: user.id, 
                email: user.email 
            });

            return token;
        } else {
            return null;
        }
    }

    async registerUser(
        name: string,
        email: string,
        address: string,
        phone_number: string,
        password: string
    ){
        const id = uuidv4();
        const user =  await UserRepository.findByEmail(email);

        if (user) {
            return false;
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