import { transaction } from 'objection';
import bcrypt from 'bcryptjs';
import Admin from '../models/Admin';
import Role from '../models/Role';

class AdminRepository {
    async findByUsername(username: string) {
        return await Admin.query().findOne({ username }).withGraphFetched('roles');
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

            return await Role.query(trx).insert({
                admin_id: id
            })
        })
    }
}

export default new AdminRepository();