import User from '../models/User';
import bcrypt from 'bcryptjs';

class UserRepository {
    async findByEmail(email: string) {
        return await User.query().findOne({ email });
    }

    async create(
        id: string,
        name: string,
        email: string,
        address: string,
        phone_number: string,
        password: string
    ) {
        return await User.query().insert({
            id,
            name,
            email,
            address,
            phone_number,
            password: await bcrypt.hash(password, 10),
        });
    }
}

export default new UserRepository();