import { Transaction, transaction } from 'objection';
import Car from '../models/Car';
import Spec from '../models/Spec';
import Option from '../models/Option';

class CarRepository {
    async findAll(): Promise<Car[]> {
        return await Car.query().whereNull('deleted_at').withGraphFetched('[options, specs]');
    }

    async findAllNotDeleted(): Promise<Car[]> {
        return await Car.query().withGraphFetched('[options, specs]');
    }

    async findById(id: string): Promise<Car | undefined> {
        return await Car.query().findById(id).whereNull('deleted_at').withGraphFetched('[options, specs]');
    }

    async findByIdNotDeleted(id: string): Promise<Car | undefined> {
        return await Car.query().findById(id).withGraphFetched('[options, specs]');
    }

    async create(
        admin_id: string,
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
        option: string,
        spec: string
    ): Promise<void>{
        return await transaction(Car.knex(), async (trx: Transaction) => {
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
                year,
                rent_price,
                created_by: admin_id
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
        admin_id: string,
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
        spec: string,
        updated_at: Date
    ): Promise<void>{

        return await transaction(Car.knex(), async (trx: Transaction) => {
            await Car.query(trx).findById(id).update({
                plate,
                manufacture,
                model,
                image,
                capacity,
                description,
                transmission,
                type,
                year,
                rent_price,
                available,
                updated_by: admin_id,
                updated_at
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

    async delete(id: string, admin_id: string, deleted_at: Date): Promise<number> {
        return await Car.query().findById(id).update({
            deleted_by: admin_id,
            deleted_at
        });    
    }
}

export default new CarRepository();