import { Model } from 'objection';
import Car from './Car';
import Customer from './Customer';

class Order extends Model {
    id!: string;
    car_id!: string;
    cars!: Car[];
    customer_id!: string;
    customers!: Customer[];
    duration!: number;
    rent_start!: Date;
    rent_end!: Date;
    total_price!: number;
    status!: string;
    created_at!: Date;
    updated_at!: Date

    static get tableName() {
        return 'orders';
    }

    static get relationMappings() {
        return {
            cars: {
                relation: Model.BelongsToOneRelation,
                modelClass: Car,
                join: {
                    from: 'orders.car_id',
                    to: 'cars.id'
                }
            },
            customers: {
                relation: Model.BelongsToOneRelation,
                modelClass: Customer,
                join: {
                    from: 'orders.customer_id',
                    to: 'customers.id'
                }
            }

        };
    }
}

export default Order;