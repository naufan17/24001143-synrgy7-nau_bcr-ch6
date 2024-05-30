import { transaction, Transaction } from 'objection';
import bcrypt from 'bcryptjs';
import Admin from '../models/Admin';

class AdminRepository {
    async findAll(): Promise<Admin[]> {
        return await Admin.query();
    }

    async findByUsername(username: string): Promise<Admin | undefined> {
        return await Admin.query().findOne({ username });
    }

    async create(id: string, username: string, password: string): Promise<void> {
        return await transaction(Admin.knex(), async (trx: Transaction) => {
            await Admin.query(trx).insert({
                id,
                username,
                password: await bcrypt.hash(password, 10),
            });
        })
    }
}

export default new AdminRepository();