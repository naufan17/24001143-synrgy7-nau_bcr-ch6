import { Model } from 'objection';

class CarDelete extends Model {
    id!: number;
    admin_id!: string;
    car_id!: string;

    static get tableName() {
        return 'car_deletes';
    }
}

export default CarDelete;