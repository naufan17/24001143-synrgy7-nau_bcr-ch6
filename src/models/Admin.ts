import { Model } from 'objection';
import Role from './Role';

class Admin extends Model {
    id!: string;
    username!: string;
    password!: string;
    roles!: Role;
    created_at!: Date;
    updated_at!: Date

    static get tableName() {
        return 'admins';
    }

    static get relationMappings() {
        return {
            roles: {
                relation: Model.BelongsToOneRelation,
                modelClass: Role,
                join: {
                    from: 'admins.id',
                    to: 'roles.admin_id'
                }
            },    
        };
    }
}

export default Admin;