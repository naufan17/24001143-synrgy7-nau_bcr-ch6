import { Transaction, transaction } from 'objection';
import Car from '../models/Car';
import Spec from '../models/Spec';
import Option from '../models/Option';

class CarRepository {
    async findAll(): Promise<Car[]> {
        return await Car.query().whereNull('deleted_at').withGraphFetched('[options, specs]');
    }

    async findAllNotDeleted(): Promise<Car[]> {
        return await Car.query().withGraphFetched('[options, specs, createdByAdmin, updatedByAdmin, deletedByAdmin]');
    }

    async findById(id: string): Promise<Car | undefined> {
        return await Car.query().findById(id).whereNull('deleted_at').withGraphFetched('[options, specs]');
    }

    async findByIdNotDeleted(id: string): Promise<Car | undefined> {
        return await Car.query().findById(id).withGraphFetched('[options, specs, createdByAdmin, updatedByAdmin, deletedByAdmin]');
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

            const optionsArray = Array.isArray(option) ? option : [option];
            const specsArray = Array.isArray(spec) ? spec : [spec];

            await Promise.all([
                ...optionsArray.map((opt: string) =>
                    Option.query(trx).insert({ car_id: id, option: opt })
                ),
                ...specsArray.map((sp: string) =>
                    Spec.query(trx).insert({ car_id: id, spec: sp })
                )
            ]);
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

            const optionsArray = Array.isArray(option) ? option : [option];
            const specsArray = Array.isArray(spec) ? spec : [spec];

            if (optionsArray.length > 0 && optionsArray[0]){
                await Option.query(trx).where('car_id', id).delete();
                await Promise.all([
                    ...optionsArray.map((opt: string) =>
                        Option.query(trx).insert({ car_id: id, option: opt })
                    ),
                ]);
            }

            if (specsArray.length > 0 && specsArray[0]){
                await Spec.query(trx).where('car_id', id).delete();
                await Promise.all([
                    ...specsArray.map((sp: string) =>
                        Spec.query(trx).insert({ car_id: id, spec: sp })
                    )
                ]);
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