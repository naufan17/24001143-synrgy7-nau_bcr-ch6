import bcrypt from 'bcryptjs';
import Admin from '../models/Admin';

class AdminRepository {
    async findByUsername(username: string) {
        return await Admin.query().findOne({ username }).withGraphFetched('[roles]');
    }

    async create(
        id: string,
        username: string,
        password: string
    ) {
        return await Admin.query().insert({
            id,
            username,
            password: await bcrypt.hash(password, 10),
        });
    }
}

export default new AdminRepository();