import { Model } from 'objection';
import Order from './Order';

class Customer extends Model {
    id!: string;
    name!: string;
    email!: string;
    address!: string;

    static get tableName() {
        return 'customers';
    }

    static get relationMappings() {
        return {
            orders: {
                relation: Model.HasManyRelation,
                modelClass: Order,
                join: {
                    from: 'customers.id',
                    to: 'orders.customer_id'
                }
            },    
        };
    }
}

export default Customer;