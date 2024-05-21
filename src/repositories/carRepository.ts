import { transaction } from 'objection';
import Car from '../models/Car';
import Rent from '../models/Rent';
import Spec from '../models/Spec';
import Option from '../models/Option';

class CarRepository {
    async findAll() {
        return await Car.query().withGraphFetched('[rents]');
    }

    async findById(id: string) {
        return await Car.query().findById(id).withGraphFetched('[rents, options, specs]');        
    }

    async create(
        id: string, 
        plate: string,
        manufacture: string,
        model: string,
        image: string,
        capacity: number,
        description: string,
        transmission: string,
        type: string,
        year: number,
        rent_price: number,
        available: boolean,
        option: string,
        spec: string
    ){
        return await transaction(Car.knex(), async (trx) => {
            await Car.query(trx).insert({
                id: id,
                plate,
                manufacture,
                model,
                image,
                capacity,
                description,
                transmission,
                type,
                year
            });

            await Rent.query(trx).insert({
                car_id: id,
                rent_price,
                available
            });

            if (Array.isArray(option)) {
                await Promise.all(option.map((opt: string) => 
                    Option.query(trx).insert({
                        car_id: id,
                        option: opt
                    })
                ));
            } else {
                await Option.query(trx).insert({
                    car_id: id,
                    option
                })
            }

            if (Array.isArray(spec)) {
                await Promise.all(spec.map((sp: string) => 
                    Spec.query(trx).insert({
                        car_id: id,
                        spec: sp
                    })
                ));
            } else {
                await Spec.query(trx).insert({
                    car_id: id,
                    spec
                })
            }
        });
    }

    async update(
        id: string, 
        plate: string,
        manufacture: string,
        model: string,
        image: string,
        capacity: number,
        description: string,
        transmission: string,
        type: string,
        year: number,
        rent_price: number,
        available: boolean,
        option: string,
        spec: string
    ){
        return await transaction(Car.knex(), async (trx) => {
            await Car.query(trx).findById(id).update({
                plate,
                manufacture,
                model,
                image,
                capacity,
                description,
                transmission,
                type,
                year
            });

            await Rent.query(trx).where('car_id', id).update({
                rent_price,
                available
            });

            await Option.query(trx).where('car_id', id).delete();
            if (Array.isArray(option)) {
                await Promise.all(option.map((opt: string) => 
                    Option.query(trx).insert({ 
                        car_id: id,
                        option: opt 
                    })
                ));
            } else {
                await Option.query(trx).insert({ 
                    car_id: id,
                    option 
                });
            }

            await Spec.query(trx).where('car_id', id).delete();
            if (Array.isArray(spec)) {
                await Promise.all(spec.map((sp: string) => 
                    Spec.query(trx).insert({ 
                        car_id: id,
                        spec: sp 
                    })
                ));
            } else {
                await Spec.query(trx).insert({ 
                    car_id: id,
                    spec 
                });
            }
        })
    }

    async delete(id: string){
        return await transaction(Car.knex(), async (trx) => {
            await Rent.query(trx).delete().where('car_id', id);
            await Option.query(trx).delete().where('car_id', id);
            await Spec.query(trx).delete().where('car_id', id);
            return await Car.query(trx).deleteById(id);
        });
    }
}

export default new CarRepository();