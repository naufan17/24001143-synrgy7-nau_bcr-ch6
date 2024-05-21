import Rent from '../models/Rent';

class RentRepository {
    async create(
        id: string, 
        rent_price: number,
        available: boolean,
    ){
        return await Rent.query().insert({
            car_id: id,
            rent_price,
            available
        });
    }

    async update(
        id: string, 
        rent_price: number,
        available: boolean,
    ){
        return await Rent.query().where('car_id', id).update({
            rent_price,
            available
        });
    }

    async delete(id: string){
        return await Rent.query().delete().where('car_id', id);
    }
}

export default new RentRepository();