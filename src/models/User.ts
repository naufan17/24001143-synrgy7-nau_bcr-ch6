import { Model } from 'objection';
import Order from './Order';

class User extends Model {
    id!: string;
    name!: string;
    email!: string;
    address!: string;
    phone_number!: number;
    password!: string;
    created_at!: Date;
    updated_at!: Date

    static get tableName() {
        return 'users';
    }
}

export default User;