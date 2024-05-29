import { Model } from 'objection';
import Car from './Car';
import User from './User';

class Order extends Model {
    id!: string;
    car_id!: string;
    cars!: Car;
    user_id!: string;
    users!: User;
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
                relation: Model.HasOneRelation,
                modelClass: Car,
                join: {
                    from: 'orders.car_id',
                    to: 'cars.id'
                }
            },
            users: {
                relation: Model.HasOneRelation,
                modelClass: User,
                join: {
                    from: 'orders.user_id',
                    to: 'users.id'
                }
            }
        };
    }
}

export default Order;