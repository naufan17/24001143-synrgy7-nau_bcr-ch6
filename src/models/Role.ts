import { Model } from 'objection';

class Role extends Model {
    id!: number;
    admin_id!: string;
    super_admin!: boolean;

    static get tableName() {
        return 'roles';
    }
}

export default Role;