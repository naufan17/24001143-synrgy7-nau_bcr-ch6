import { Model } from 'objection';

class Admin extends Model {
    id!: string;
    username!: string;
    password!: string;
    created_at!: Date;
    updated_at!: Date

    static get tableName() {
        return 'admins';
    }
}

export default Admin;