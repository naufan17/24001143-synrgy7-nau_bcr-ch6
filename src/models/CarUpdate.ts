import { Model } from 'objection';

class CarUpdate extends Model {
    id!: number;
    admin_id!: string;
    car_id!: string;

    static get tableName() {
        return 'car_updates';
    }
}

export default CarUpdate;