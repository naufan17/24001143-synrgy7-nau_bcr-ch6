import { Model } from 'objection';

class CarCreate extends Model {
    id!: number;
    admin_id!: string;
    car_id!: string;

    static get tableName() {
        return 'car_creates';
    }
}

export default CarCreate;