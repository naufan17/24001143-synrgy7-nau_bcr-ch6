import { Model } from 'objection';
import Rent from './Rent';
import Option from './Option';
import Spec from './Spec';
import Order from './Order';

class Car extends Model {
    id!: string;
    plate!: string;
    manufacture!: string;
    model!: string;
    image!: string;
    capacity!: number;
    description!: string;
    transmission!: string;
    type!: string;
    year!: number;
    rents!: Rent;
    options!: Option[];
    specs!: Spec[];
    orders!: Order[];
    created_at!: Date;
    updated_at!: Date;

    static get tableName() {
        return 'cars';
    }

    static get relationMappings() {
        return {
            rents: {
                relation: Model.HasOneRelation,
                modelClass: Rent,
                join: {
                    from: 'cars.id',
                    to: 'rents.car_id'
                }
            },    
            options: {
                relation: Model.HasManyRelation,
                modelClass: Option,
                join: {
                    from: 'cars.id',
                    to: 'options.car_id'
                }
            },
            specs: {
                relation: Model.HasManyRelation,
                modelClass: Spec,
                join: {
                    from: 'cars.id',
                    to: 'specs.car_id'
                }
            },
            orders: {
                relation: Model.HasManyRelation,
                modelClass: Order,
                join: {
                    from: 'cars.id',
                    to: 'orders.car_id'
                }
            },
        };
    }
}

export default Car;