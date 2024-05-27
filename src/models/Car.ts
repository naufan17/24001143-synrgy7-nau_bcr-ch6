import { Model } from 'objection';
import Rent from './Rent';
import Option from './Option';
import Spec from './Spec';
import CarCreate from './CarCreate';
import CarUpdate from './CarUpdate';
import CarDelete from './CarDelete';

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
    created_at!: Date;
    car_creates!: CarCreate;
    updated_at!: Date;
    car_updates!: CarUpdate;
    deleted_at!: Date;
    car_deletes!: CarDelete;

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
            car_creates: {
                relation: Model.HasOneRelation,
                modelClass: CarCreate,
                join: {
                    from: 'cars.id',
                    to: 'car_creates.car_id'
                }
            },
            car_updates: {
                relation: Model.HasOneRelation,
                modelClass: CarUpdate,
                join: {
                    from: 'cars.id',
                    to: 'car_updates.car_id'
                }
            },
            car_deletes: {
                relation: Model.HasOneRelation,
                modelClass: CarDelete,
                join: {
                    from: 'cars.id',
                    to: 'car_deletes.car_id'
                }
            },
        };
    }
}

export default Car;