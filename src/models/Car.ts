import { Model } from 'objection';
import Option from './Option';
import Spec from './Spec';
import Admin from './Admin';

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
    createdByAdmin!: Admin;
    created_at!: Date;
    updated_by!: string;
    updatedByAdmin!: Admin;
    updated_at!: Date;
    deleted_by!: string;
    deletedByAdmin!: Admin;
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
            createdByAdmin: {
                relation: Model.BelongsToOneRelation,
                modelClass: Admin,
                join: {
                    from: 'cars.created_by',
                    to: 'admins.id'
                }
            },
            updatedByAdmin: {
                relation: Model.BelongsToOneRelation,
                modelClass: Admin,
                join: {
                    from: 'cars.updated_by',
                    to: 'admins.id'
                }
            },
            deletedByAdmin: {
                relation: Model.BelongsToOneRelation,
                modelClass: Admin,
                join: {
                    from: 'cars.deleted_by',
                    to: 'admins.id'
                }
            },
        };
    }
}

export default Car;