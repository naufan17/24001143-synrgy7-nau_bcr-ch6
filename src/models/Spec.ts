import { Model } from 'objection';

class Spec extends Model {
    id!: number;
    car_id!: string;
    spec!: string;

    static get tableName() {
        return 'specs';
    }
}

export default Spec;