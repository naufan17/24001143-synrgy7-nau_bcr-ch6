import { transaction, Transaction } from 'objection';
import User from '../models/User';

class UserRepository {
    async findAll(): Promise<User[]> {
        return await User.query();
    }

    async findByEmail(email: string): Promise<User | undefined> {
        return await User.query().findOne({ email });
    }

    async create(
        id: string,
        name: string,
        email: string,
        address: string,
        phone_number: string,
        password: string
    ): Promise<void> {
        return await transaction(User.knex(), async(trx:Transaction) => {
            await User.query(trx).insert({
                id,
                name,
                email,
                address,
                phone_number,
                password: password
            });                
        })
    }
}

export default new UserRepository();