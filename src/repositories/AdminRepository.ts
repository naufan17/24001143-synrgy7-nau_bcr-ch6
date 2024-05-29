import { transaction } from 'objection';
import bcrypt from 'bcryptjs';
import Admin from '../models/Admin';

class AdminRepository {
    async findAll() {
        return await Admin.query();
    }

    async findByUsername(username: string) {
        return await Admin.query().findOne({ username });
    }

    async create(
        id: string,
        username: string,
        password: string
    ) {
        return await transaction(Admin.knex(), async (trx) => {
            await Admin.query(trx).insert({
                id,
                username,
                password: await bcrypt.hash(password, 10),
            });
        })
    }
}

export default new AdminRepository();