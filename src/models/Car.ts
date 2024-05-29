import { Model } from 'objection';
import Option from './Option';
import Spec from './Spec';

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
    rent_price!: number;
    available!: boolean;
    options!: Option[];
    specs!: Spec[];
    created_by!: string;
    created_at!: Date;
    updated_by!: string;
    updated_at!: Date;
    deleted_by!: string;
    deleted_at!: Date;

    static get tableName() {
        return 'cars';
    }

    static get relationMappings() {
        return {
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
        };
    }
}

export default Car;