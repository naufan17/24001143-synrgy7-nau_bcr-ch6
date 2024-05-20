import { Model } from 'objection';

class Option extends Model {
    id!: number;
    car_id!: string;
    option!: string;

    static get tableName() {
        return 'options';
    }
}

export default Option;