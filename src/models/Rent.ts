import { Model } from 'objection';

class Rent extends Model {
    id!: number;
    car_id!: string;
    rent_price!: number;
    available!: boolean;

    static get tableName() {
        return 'rents';
    }
}

export default Rent;